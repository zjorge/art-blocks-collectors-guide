import React from 'react';
import AccountInput from './AccountInput';
import {truncateAddress} from './utils/walletAddress';
import './ViewAccountHandling.css'

function ViewAccountHandling({viewAccount, userAccount, setViewAccount}) {
  return (
    <div className="container">
      <AccountInput
        setAccount={setViewAccount}
        userAccount={userAccount}
      />
      <h2>You are viewing {viewAccount === userAccount ? "your" : `${truncateAddress(viewAccount)}'s`} profile</h2> 
    </div>
  );
}

export default ViewAccountHandling;
