import Link from "next/link";
import styles from "./styles.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">DuxFund</Link>
      </div>

      <ul className={styles.navLinks}>
        <li><Link href="/invest">Investir</Link></li>
        <li><Link href="/pools">Pools</Link></li>
        <li><Link href="/sobre">Sobre</Link></li>
      </ul>

      <div className={styles.walletSection}>
        <button className={styles.connectBtn}>Conectar Carteira</button>
      </div>
    </nav>
  );
}
