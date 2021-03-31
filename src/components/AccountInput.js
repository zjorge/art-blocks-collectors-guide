import React, {useState} from 'react';
import {isAddress} from './utils/walletAddress';
import './AccountInput.css';
import './button.css';

function AccountInput({setAccount, userAccount}) {
  const [inputAccount, setInputAccount] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    setInputAccount(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (inputAccount === "") {
      setAccount(userAccount);
      setError("");
      return;
    }

    if (!isAddress(inputAccount)) {
      setError("Address is not valid");
      return;
    }

    setError("");
    setAccount(inputAccount);
  }

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <label className="label-container">
          <span className="label">Wallet ID:&nbsp;</span>
          <input className="wallet-input" type="text" value={inputAccount} onChange={handleChange} />
        </label>
        <input className="button" type="submit" value="Submit" />
      </form>
      <div>{error}</div>
    </div>
  );
}

export default AccountInput;
