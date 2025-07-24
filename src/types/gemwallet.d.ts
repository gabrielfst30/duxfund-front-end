export {};

declare global { // definindo a interface da gem wallet
  interface Window { // definindo a interface da gem wallet
    gemWallet?: any; // gemwallet pode existir ou não
  }
}