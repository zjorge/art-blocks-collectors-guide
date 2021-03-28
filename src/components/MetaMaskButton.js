import React from 'react';
import './MetaMaskButton.css';

function MetaMaskButton({web3, setAccount, requestAccount, account}) {
  if (account) {
    return (
      <div>{account.slice(0, 7)}...</div>
    )
  }

  return (
    <div
      className="metamask-button"
      onClick={() => requestAccount(web3, setAccount)}
    >
      Connect with MetaMask
    </div>
  )
}

export default MetaMaskButton;
