import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import MetaMaskButton from './components/MetaMaskButton';
import ProjectView from './components/ProjectView';

function App() {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState("main");
  const [projectId] = useState(33);

  const [web3] = useState(new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546'));

  useEffect(() => {
    requestAccount(web3, setAccount);
    async function getNetwork() {
      setNetwork(await web3.eth.net.getNetworkType());
    }
    getNetwork();
  }, [web3]);

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
      <ProjectView
        account={account}
        web3={web3}
        projectId={projectId}
      />
    </div>
  );
}

async function requestAccount(web3, setAccount) {
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
}

export default App;
