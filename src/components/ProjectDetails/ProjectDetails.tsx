import styles from "./styles.module.scss";

export function ProjectDetails() {
  return (
    <div className={styles.ProjectDetails}>
      <div className={styles.title}>
        <h1>Project Details</h1>
        <div className={styles.subtitle}>Fund the Future of Web3</div>
      </div>

      <div className={styles.text}>
        <p>
          Help young blockchain developers transform the crypto ecosystem with
          DuxFund, an innovative project that connects purpose, technology, and
          social impact. Your XRP donation, of any amount, fuels the development
          of real, decentralized solutions.
        </p>
      </div>
    </div>
  );
}
