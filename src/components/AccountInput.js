import React, {useState} from 'react';

function AccountInput({setAccount}) {
  const [inputAccount, setInputAccount] = useState("");

  function handleChange(event) {
    setInputAccount(event.target.value);
  }

  function handleSubmit(event) {
    setAccount(inputAccount);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Wallet ID:&nbsp;
        <input type="text" value={inputAccount} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default AccountInput;
