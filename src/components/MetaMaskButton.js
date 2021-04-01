import React from 'react';
import './MetaMaskButton.css';
import {truncateAddress} from './utils/walletAddress';

function MetaMaskButton({web3, requestAccount, account}) {
  if (account) {
    return (
      <div>{truncateAddress(account)}</div>
    )
  }
  if (!web3._provider) {
    return null;
  }

  return (
    <div
      className="metamask-button"
      onClick={() => requestAccount()}
    >
      Connect with MetaMask
    </div>
  )
}

export default MetaMaskButton;
