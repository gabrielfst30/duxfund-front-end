'use client';
import { NFTForm } from './NFTForm';

export const NFTViewer = () => {
  return (
    <div className="nft-creator">
      <h1>Criador de NFTs XRPL</h1>
      <p>Cunhe NFTs de teste na XRPL Testnet</p>
      <NFTForm />
    </div>
  );
};
