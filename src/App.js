import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import PieceBrowser from './components/PieceBrowser';
import MetaMaskButton from './components/MetaMaskButton';
import ProjectInformation from './components/ProjectInformation';
import abi from './api.json';

const artblocksContract = "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270";

function App() {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState("main");
  const [projectId] = useState(33);
  const [projectInfo, setProjectInfo] = useState(null);
  const [allTokens, setAllTokens] = useState([]);
  const [web3] = useState(new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546'));

  useEffect(() => {
    requestAccount(web3, setAccount);
    async function getNetwork() {
      setNetwork(await web3.eth.net.getNetworkType());
    }
    getNetwork();
  }, [web3]);

  useEffect(() => {
    async function fetchProjectDetails() {
      let contract = new web3.eth.Contract(abi, artblocksContract);
      setProjectInfo(await contract.methods.projectDetails(projectId).call());
    }
    fetchProjectDetails();
  }, [projectId, web3]);

  useEffect(() => {
    if (!account) {
      return; 
    }

    async function fetchTokens() {
      let contract = new web3.eth.Contract(abi, artblocksContract);
      
      const ids = await contract.methods.tokensOfOwner(account).call();
      const tokens = await Promise.all(ids.map(async (id) => {
        return {
          id,
          hash: await contract.methods.tokenIdToHash(id).call()
        };
      }));
      setAllTokens(tokens);
    }
    
    fetchTokens();

   }, [account, web3]);

  const regex = new RegExp(`^${projectId}\\d+`, 'g');
  const tokens = allTokens.filter(token => token.id.match(regex));

  return (
    <div>
      <nav>
        <div className="title">Empyrean Collectors Guide</div>
        <MetaMaskButton 
          web3={web3}
          account={account}
          setAccount={setAccount}
          requestAccount={requestAccount}
        />
      </nav>
      {network !== "main" && <div className="test-net-warning">This app only works on main net. Please check your MetaMask settings and try again.</div>}
      <ProjectInformation 
        projectInfo={projectInfo}
        tokens={tokens}
        projectId={projectId}
      />
      <PieceBrowser tokens={tokens} projectId={projectId}/>
    </div>
  );
}

async function requestAccount(web3, setAccount) {
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
}

export default App;
