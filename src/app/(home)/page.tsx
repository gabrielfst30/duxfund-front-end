import styles from "./styles.module.scss";
import GemWalletConnect from "@/components/Navbar/GemWalletConnect"; // importando componente de conexão da gem wallet


export default function Home() {
  return (
    <div>
      <h1>Home Page</h1> 
      <GemWalletConnect />
    </div>
  );
}
