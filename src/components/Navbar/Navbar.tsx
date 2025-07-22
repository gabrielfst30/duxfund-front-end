import styles from "./styles.module.scss";

export function Navbar() {
  return (
    <div className={styles.Navbar}>
      <div className={styles.logo}>
        <h1>
          <img src="/logoduxfund.png" alt="Logo" className={styles.logoImage} />
          DuxFund
        </h1>
      </div>
      <div className={styles.connect}>
        <p>Connect Wallet</p>
      </div>
    </div>
  );
}
