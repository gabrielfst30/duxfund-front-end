'use client'; // Necessário para usar hooks do React

import Image from 'next/image';
import styles from './styles.module.scss';
import { useState } from 'react';
import { connectXumm, checkXummStatus } from '@/services/xumm_wallet/wallet';

export function Navbar() {
  const [account, setAccount] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
        const result = await connectXumm();
        setQrCodeUrl(result.connectUrl);

        // Inicia o polling para verificar o status do payload
        const interval = setInterval(async () => {
        const status = await checkXummStatus(result.uuid);
        if (status.resolved) {
            setAccount((status as any).account);
            setQrCodeUrl(null); // Esconde o QR code
            clearInterval(interval);
        }
        }, 2000); // Verifica a cada 2 segundos
    } catch (error) {
        console.error("Failed to connect wallet:", error)
        alert("Could not connect to XUMM wallet. See console for details.")
    }
  };

  return (
    <div className={styles.Navbar}>
      <div className={styles.logo}>
        <h1>
          <Image
            src="/logoduxfund.png"
            alt="Logo"
            width={40}
            height={40}
            className={styles.logoImage}
          />
          DuxFund
        </h1>
      </div>

      <div className={styles.connect} onClick={!account ? handleConnect : undefined}>
        <div className={styles.connectText}>
          <p>{account ? `Connected: ${account.substring(0, 6)}...` : 'Connect Wallet'}</p>
        </div>
      </div>

      {qrCodeUrl && (
        <div className={styles.qrCodeModal} onClick={() => setQrCodeUrl(null)}>
          <div className={styles.qrCodeContent} onClick={(e) => e.stopPropagation()}>
            <h2>Scan with XUMM</h2>
            <img src={qrCodeUrl.replace('wss://', 'https://') + '.png'} alt="XUMM QR Code" />
            <p>
              <a href={qrCodeUrl} target="_blank" rel="noopener noreferrer">
                Open in XUMM App
              </a>
            </p>
             <button onClick={() => setQrCodeUrl(null)} className={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}