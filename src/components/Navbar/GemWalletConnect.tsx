"use client"

import { useState } from "react";

import { isInstalled, getAddress } from "@gemwallet/api";

export default function GemWalletConnect() {
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setError(null);

    try {
      const installed = await isInstalled();
      if (!installed.result.isInstalled) {
        setError("GemWallet não encontrada. Instale a extensão no navegador.");
        return;
      }

      const response = await getAddress();
      if (response.type === "response" && response.result?.address) {
        setAddress(response.result.address);
      } else {
        setError("Não foi possível obter o endereço da carteira.");
      }
    } catch (e) {
      setError("Erro ao conectar à GemWallet: " + (e as Error).message);
    }
  };

  return (
    <div>
      <button onClick={handleConnect}>Connect Gem Wallet</button>
      {address && <div>Wallet connected: {address}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}



