import { useState } from "react";
import styles from "./styles.module.scss";

interface ContributeProps {
  onSend: (amount: number) => void;
}

export function Contribute({ onSend }: ContributeProps) {
  const [amount, setAmount] = useState("");

  const handleSend = () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      onSend(value);
      setAmount("");
    }
  };

  return (
    <div className={styles.Contribute}>
      <div className={styles.header}>
        <h1>Contribute to the DuxFund</h1>
        <p>Enter the amount you want to send in XRP.</p>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="amount">Amount (XRP):</label>
        <input
          id="amount"
          type="number"
          placeholder="0.00"
          min="0"
          step="any"
          className={styles.amountInput}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className={styles.buttonWrapper}>
        <button onClick={handleSend}>Send Contribution</button>
      </div>
    </div>
  );
}
