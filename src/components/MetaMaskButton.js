import React from 'react';
import './MetaMaskButton.css';

function MetaMaskButton({requestAccount, account}) {
  if (account) {
    return (
      <div>{account.slice(0, 7)}...</div>
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
