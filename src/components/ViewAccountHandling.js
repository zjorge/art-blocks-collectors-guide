import React from 'react';
import AccountInput from './AccountInput';
import {truncateAddress} from './utils/walletAddress';
import './ViewAccountHandling.css';
import './button.css';

function ViewAccountHandling({contract, viewAccount, userAccount, setViewAccount, projectId, web3}) {
  async function getRandomAccount() {
    const tokens = await contract.methods.projectShowAllTokens(projectId).call();
    const owners = new Set();
    await Promise.all(tokens.map(async (token) => {
      owners.add(await contract.methods.ownerOf(token).call())
    }));
    const ownerArray = Array.from(owners);
    setViewAccount(ownerArray[Math.floor(Math.random() * ownerArray.length)]); 
  };

  return (
    <div className="view-account-container">
      <div className="account-search-container">
        <AccountInput
          web3={web3}
          setAccount={setViewAccount}
          userAccount={userAccount}
        />
        <button 
          className="random-account-button button" 
          onClick={getRandomAccount}
        >
          Get Random Collection
        </button>
      </div>
      {(viewAccount || userAccount) &&
        <h2>You are viewing {viewAccount === userAccount ? "your" : `${truncateAddress(viewAccount)}'s`} collection</h2> 
      }
    </div>
  );
}

export default ViewAccountHandling;
