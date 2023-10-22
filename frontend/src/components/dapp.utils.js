export const HARDHAT_NETWORK_ID = '1';
// This is an error code that indicates that the user canceled a transaction
export const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

export function checkNetwork() {
  return window.ethereum.networkVersion === HARDHAT_NETWORK_ID;
}
