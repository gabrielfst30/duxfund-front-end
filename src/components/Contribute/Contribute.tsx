'use client';

import styles from "./styles.module.scss";
import { useState } from 'react';
import { transfer, checkXummStatus } from '@/services/xumm_wallet/wallet';

export function Contribute() {
  const [amount, setAmount] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  
  // IMPORTANTE: Substitua pelo endereço da sua carteira de destino
  const DUX_WALLET_ADDRESS = 'r392C9w91noNoLKLUnPApx7kxkrLmFMZiH'; 

  const handleSendContribution = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    if (!DUX_WALLET_ADDRESS.startsWith('r')) {
        alert('Please set a valid DUX_WALLET_ADDRESS in the Contribute.tsx component.');
        return;
    }

    setStatusMessage('Creating transaction...');
    try {
      const result = await transfer(DUX_WALLET_ADDRESS, amount);
      setQrCodeUrl(result.connectUrl);
      setStatusMessage('Scan the QR code with XUMM to sign the transaction.');

      const interval = setInterval(async () => {
        const status = await checkXummStatus(result.uuid);
        if (status.resolved) {
          setStatusMessage('Transaction successful!');
          setQrCodeUrl(null);
          clearInterval(interval);
        }
      }, 2000);

    } catch (error) {
      console.error('Contribution failed:', error);
      setStatusMessage('Failed to send contribution. Check the console for more details.');
    }
  };

  return (
    <>
      <div className={styles.Contribute}>
        <div className={styles.header}>
          <h1>Contribute to the DuxFund</h1>
          <p>Enter the amount you want to send in XRP.</p>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="amount">Amount (XRP):</label>
          <input
            id="amount"
            type="number"
            placeholder="0.00"
            min="0"
            step="any"
            className={styles.amountInput}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className={styles.buttonWrapper}>
          <button onClick={handleSendContribution}>Send Contribution</button>
        </div>
      </div>
       {qrCodeUrl && (
        <div className={styles.qrCodeModal} onClick={() => setQrCodeUrl(null)}>
          <div className={styles.qrCodeContent} onClick={(e) => e.stopPropagation()}>
            <h2>Scan to Sign Transaction</h2>
             <img src={qrCodeUrl.replace('wss://', 'https://') + '.png'} alt="XUMM QR Code" />
            <p>{statusMessage}</p>
            <button onClick={() => setQrCodeUrl(null)} className={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}