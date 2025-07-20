import styles from "./styles.module.scss";

export function Lastest() {
  const contributions = [
    {
      address: "0xA7d9f6c8bE72f4Ea8Bf65e01EeFcA6C73463e123",
      time: "2 minutes ago",
      amount: "0.5 XRP",
    },
    {
      address: "0xF31cB0E4a1c6Bd7D8308D12eF32Ff2A8Ec26c456",
      time: "5 minutes ago",
      amount: "1.2 XRP",
    },
    {
      address: "0xC9eEc1fBd7C4425aF3Df0c95A7c72fCb9F23D78d",
      time: "5 minutes ago",
      amount: "1.2 XRP",
    },
    {
      address: "0x5b9D49E67f9Cc874f22f118d6F2131a4b94bA98D",
      time: "5 minutes ago",
      amount: "1.2 XRP",
    },
    {
      address: "0x5b9D49E67f9Cc874f22f118d6F2131a4b94bA98D",
      time: "5 minutes ago",
      amount: "1.2 XRP",
    },
  ];

  return (
    <div className={styles.Lastest}>
      <h1>Lastest Contributions (LP Token)</h1>

      <div className={styles.list}>
        {contributions.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.left}>
              <p className={styles.address}>{item.address}</p>
              <span className={styles.time}>{item.time}</span>
            </div>
            <div className={styles.right}>
              <span className={styles.amount}>{item.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
