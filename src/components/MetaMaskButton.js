import React from 'react';
import './MetaMaskButton.css';
import {truncateAddress} from './utils/walletAddress';

function MetaMaskButton({requestAccount, account}) {
  if (account) {
    return (
      <div>{truncateAddress(account)}</div>
    )
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
