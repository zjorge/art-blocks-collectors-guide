import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import TokenImageGrid from './components/TokenImageGrid';
import abi from './api.json';

const artblocksContract = "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270";

function App() {
  const [account, setAccount] = useState(null);
  const [projectId, setProjectId] = useState(33);
  const [allTokens, setAllTokens] = useState([]);

  useEffect(() => {
    const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
    getAccounts(web3, (result) => {
      setAccount(result[0]);
    });
  }, []);

  useEffect(() => {
    if (!account) {
      return; 
    }

    async function fetchTokens() {
      const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
      let contract = new web3.eth.Contract(abi, artblocksContract);
      console.log(contract.methods);
      setAllTokens(await contract.methods.tokensOfOwner(account).call());
    }
    
    fetchTokens();

   }, [account]);

  const regex = new RegExp(`^${projectId}\\d+`, 'g');
  const tokens = allTokens.filter(token => token.match(regex));

  return (
    <div>
      <TokenImageGrid tokens={tokens}/>
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
