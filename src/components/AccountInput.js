import React, {useState} from 'react';
import {isAddress} from './utils/walletAddress';
import './AccountInput.css';
import './button.css';

function AccountInput({setAccount, userAccount, web3}) {
  const [inputAccount, setInputAccount] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    setInputAccount(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (inputAccount === "") {
      setAccount(userAccount);
      setError("");
      return;
    }

    if (isAddress(inputAccount)) {
      setError("");
      setAccount(inputAccount);
    }

    try {
      const walletAddress = await web3.eth.ens.getAddress(inputAccount);
      setAccount(walletAddress);
    } catch {
      setError("Address is not valid");
      return;
    }
  }

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <label className="label-container">
          <span className="label">Wallet ID:&nbsp;</span>
          <div className="account-input-container">
            <input className="wallet-input" type="text" value={inputAccount} onChange={handleChange} />
            <div className="account-error-text">{error}</div>
          </div>
        </label>
        <input className="button" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AccountInput;
