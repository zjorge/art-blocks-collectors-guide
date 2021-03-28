import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import PieceBrowser from './components/PieceBrowser';
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
      
      const accountTemp = "0xF0B6339404cE990A9b9A7B940989b111Fc4E268c";
      const ids = await contract.methods.tokensOfOwner(accountTemp).call();
      const tokens = await Promise.all(ids.map(async (id) => {
        return {
          id,
          hash: await contract.methods.tokenIdToHash(id).call()
        };
      }));
      setAllTokens(tokens);
    }
    
    fetchTokens();

   }, [account]);

  const regex = new RegExp(`^${projectId}\\d+`, 'g');
  const tokens = allTokens.filter(token => token.id.match(regex));

  return (
    <div>
      <PieceBrowser tokens={tokens}/>
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
