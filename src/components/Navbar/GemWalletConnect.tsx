"use client"

import { useState } from "react"; // importando o react e useState 
export default function GemWalletConnect() {
  const [address, setAddress] = useState<string | null>(null); // armazenando endereço da gem wallet
  const [error, setError] = useState<string | null>(null); // armazenando erros

  const handleConnect = async () => {
    setError(null); // limpando as mensagens erros antigos


    console.log("window.gemWallet:", typeof window !== "undefined" ? window.gemWallet : "window undefined"); // verificar se window.gemWallet existe

   
    try {
      const result = await window.gemWallet.connect(); // conectando a gem wallet


      console.log("GemWallet connect result:", result); // resultado da conexão

      if (result.status === "success") {
        setAddress(result.address); // armazenando o endereço da gem wallet
      } else {
        setError(result.error || "connection refused."); // caso a gem wallet não esteja conectada
      }

    } catch (e) {
      // Log do erro
      console.log("Erro ao conectar:", e); // erro
      setError("error when connecting to Gem Wallet:" + (e as Error).message); // erro quando a gem wallet não está instalada
    }
  }

  return (
    <div>
      <button onClick={handleConnect}>Connect Gem Wallet</button>
      {address && <div> Wallet connected: {address}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

    </div>
  )
};



