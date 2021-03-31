import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Web3 from 'web3';
import MetaMaskButton from './components/MetaMaskButton';
import ProjectView from './components/ProjectView';
import ViewAccountHandling from './components/ViewAccountHandling';

function App() {
  const [userAccount, setUserAccount] = useState(null);
  const [viewAccount, setViewAccount] = useState(null);
  const [network, setNetwork] = useState("main");
  const [projectId] = useState(33);

  const [web3] = useState(new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546'));

  const requestAccount = useCallback(async () => {
      const accounts = await web3.eth.requestAccounts();
      setUserAccount(accounts[0]);
  }, [web3])

  useEffect(() => {
    requestAccount();
    async function getNetwork() {
      setNetwork(await web3.eth.net.getNetworkType());
    }
    getNetwork();
  }, [web3, requestAccount]);

  useEffect(() => {
      if (!viewAccount) {
        setViewAccount(userAccount)
      }
  }, [userAccount, viewAccount]);

  return (
    <div>
      <nav>
        <div className="title">Clamflelmo by Generative Artworks</div>
        <MetaMaskButton 
          web3={web3}
          account={userAccount}
          setAccount={setUserAccount}
          requestAccount={requestAccount}
        />
      </nav>
      {network !== "main" && <div className="test-net-warning">This app only works on main net. Please check your MetaMask settings and try again.</div>}
      <ViewAccountHandling
        setViewAccount={setViewAccount}
        viewAccount={viewAccount}
        userAccount={userAccount}
      />
      
      <ProjectView
        account={viewAccount}
        web3={web3}
        projectId={projectId}
      />
    </div>
  );
}



export default App;
