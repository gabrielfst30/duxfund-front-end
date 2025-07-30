import styles from "./styles.module.scss";

interface Contribution {
  amount: number;
  timestamp: string;
}

interface LastestProps {
  contributions: Contribution[];
}

export function Lastest({ contributions }: LastestProps) {
  return (
    <div className={styles.Lastest}>
      <h1>Latest Contributions (LP Token)</h1>
      <div className={styles.list}>
        {contributions.length === 0 ? (
          <div className={styles.card}>
            <div className={styles.left}>
              <span className={styles.address}>No contributions yet.</span>
            </div>
          </div>
        ) : (
          contributions.map((contribution, index) => {
            const date = new Date(contribution.timestamp);
            let month = date.toLocaleString("default", { month: "short" });
            month = month.charAt(0).toUpperCase() + month.slice(1);
            const minutes = date.getMinutes().toString().padStart(2, "0");

            return (
              <div className={styles.card} key={index}>
                <div className={styles.left}>
                  <span className={styles.address}>User #{index + 1}</span>
                  <span className={styles.time}>
                    {minutes} minutos {month}
                  </span>
                </div>
                <div className={styles.right}>{contribution.amount} XRP</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
