import React from 'react';
import styles from './mintbar.module.css';
import Wook from '../../../app-assets/img/yellow-mint.png';

export const MintBar = ({
  userAddress,
  mintNFT,
  transactionInProgress,
  getCurrentTokenID,
  currentTokenId: currToken,
  isSuccess,
}) => {
  const [number, setNumber] = React.useState(1);
  const [currentTokenId, setCurrentTokenId] = React.useState(null);
  const [transInProgress, setTransInProgress] = React.useState(false);
  const wookIndex = 313;
  React.useEffect(() => {
    async function getTokenId() {
      const tokenId = await getCurrentTokenID();
      console.log(tokenId);
      setCurrentTokenId(tokenId);
    }
    getTokenId();
  }, []);

  React.useEffect(() => {
    if (transInProgress === false) {
      async function getTokenId() {
        const tokenId = await getCurrentTokenID();
        console.log(tokenId);
        setCurrentTokenId(tokenId);
      }
      getTokenId();
    }
  }, [transInProgress]);

  const handleSetNumber = (num) => {
    if (num > 10) {
      alert('Maximum 10 allowed per wallet');
      return;
    }
    setNumber(num);
  };
  const handleMint = () => {
    setTransInProgress(true);
    mintNFT(number);
  };

  return (
    <div className={styles.mintbar}>
      <div className={styles.mintbarInner}>
        <img src={Wook} />

        <div className={styles.mintMessage}>
          <div className={styles.mintStuff}>
            <div className={styles.mintText}>
              <h3>Mint Your Free Wook</h3>
              <span>Wooks are randomly generated and you can mint up to 10.</span>
              <span className={styles.remaining}>{`${5000 - currentTokenId} / 5000 Wooks Remaining`}</span>
              <div className={styles.mintControls}>
                {!transInProgress && !isSuccess && (
                  <>
                    <div className={styles.numberWrapper}>
                      <input
                        value={number}
                        min={1}
                        max={10}
                        type="number"
                        onChange={(e) => handleSetNumber(e.target.value)}
                      ></input>
                    </div>

                    <button onClick={() => handleMint()}>MINT YOUR WOOK(S)</button>
                  </>
                )}
                {transInProgress && (
                  <div className={styles.inProgress}>
                    <span>Transaction in Progress.</span>
                    <span>
                      Be patient as we find you some wooks. Metamask will notify you when the transaction is complete.
                    </span>
                  </div>
                )}
                {!transInProgress && isSuccess && (
                  <div className={styles.inProgressSuccess}>
                    <span>Congrats!</span>
                    <span>Your a wook owner! Wooks will be revealed on April 25</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
