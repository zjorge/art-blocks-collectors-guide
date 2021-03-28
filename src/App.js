import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import PieceBrowser from './components/PieceBrowser';
import ProjectInformation from './components/ProjectInformation';
import abi from './api.json';

const artblocksContract = "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270";

function App() {
  const [account, setAccount] = useState(null);
  const [projectId] = useState(33);
  const [projectInfo, setProjectInfo] = useState(null);
  const [allTokens, setAllTokens] = useState([]);
  const [web3] = useState(new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546'));

  useEffect(() => {
    getAccounts(web3, (result) => {
      setAccount(result[0]);
    });
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
      
      const accountTemp = "0xF0B6339404cE990A9b9A7B940989b111Fc4E268c";
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
        <div className="title">Art Blocks Collectors Guide</div>
      </nav>
      <ProjectInformation 
        projectInfo={projectInfo}
        tokens={tokens}
        projectId={projectId}
      />
      <PieceBrowser tokens={tokens} projectId={projectId}/>
    </div>
  );
}

function getAccounts(web3, callback) {
    web3.eth.getAccounts((error,result) => {
        if (error) {
            console.log(error);
        } else {
            callback(result);
        }
    });
}

export default App;
