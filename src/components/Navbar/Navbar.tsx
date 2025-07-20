import styles from "./styles.module.scss";

export function Navbar() {
  return (
    <div className={styles.Navbar}>
      <div className={styles.logo}>
        <h1>DuxFund</h1>
      </div>
      <div className={styles.connect}>
        <p>Connect Wallet</p>
      </div>
    </div>
  );
}
