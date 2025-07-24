import Image from "next/image";
import styles from "./styles.module.scss";

export function Navbar() {
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

      <div className={styles.connect}>
        <div className={styles.connectText}>
          <p>Connect Wallet</p>
        </div>
      </div>
    </div>
  );
}
