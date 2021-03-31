import Web3 from 'web3';

export function isAddress(address) {
  return Web3.utils.isAddress(address);
};

export function truncateAddress(address) {
  if (!address) {
    return;
  } 

  return `${address.slice(0, 7)}...`
}
