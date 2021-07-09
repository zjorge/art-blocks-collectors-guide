import React, { useState, useEffect, useCallback } from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import './App.css';
import Web3 from 'web3';
import MetaMaskButton from './components/MetaMaskButton';
import ProjectPage from './components/ProjectPage';
import Home from './components/home/Home';

function App() {
  const [userAccount, setUserAccount] = useState(null);
  const [network, setNetwork] = useState("main");
  const [web3] = useState(new Web3(Web3.givenProvider));

  const requestAccount = useCallback(async () => {
      const accounts = await web3.eth.requestAccounts();
      setUserAccount(accounts[0]);
  }, [web3])

  useEffect(() => {
    if (!web3._provider) {
      return;
    }

    requestAccount();
    async function getNetwork() {
      setNetwork(await web3.eth.net.getNetworkType());
    }
    getNetwork();
  }, [web3, requestAccount]);

  
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <nav>
          <div className="title">Generative Artworks</div>
          <MetaMaskButton 
            web3={web3}
            account={userAccount}
            requestAccount={requestAccount}
          />
        </nav>
        {network !== "main" && <div className="test-net-warning">This app only works on main net. Please check your MetaMask settings and try again.</div>}
        <Switch>
          <Route path="/projects/:projectName">
            <ProjectPage
              web3={web3}
              userAccount={userAccount}
            />
          </Route>
          <Route path="/">
            <Home
              web3={web3}
              userAccount={userAccount}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}



export default App;
