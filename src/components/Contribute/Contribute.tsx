import styles from "./styles.module.scss";

export function Contribute() {
  return (
    <div className={styles.Contribute}>
      <h1>Contribute to the DuxFund</h1>
      <p>Enter the amount you want to send in XRP.</p>

      <label htmlFor="amount">Amount (XRP):</label>
      <input
        id="amount"
        type="number"
        placeholder="0.00"
        min="0"
        step="any"
        className={styles.amountInput}
      />

      <button>Send Contribution</button>
    </div>
  );
}
