import { useState } from "react";
import styles from "./styles.module.scss";

interface ContributeProps {
  onSend: (amount: number) => void;
}

export function Contribute({ onSend }: ContributeProps) {
  const [amountRaw, setAmountRaw] = useState(""); // só dígitos

  // Número mínimo permitido
  const MIN_VALUE = 0.000001;

  // Formata o valor para string com vírgula antes das casas decimais (6 casas)
  const formatAmount = (value: string) => {
    if (value.length === 0) return "";
    if (value.length <= 6) {
      // ex: "543" vira "0,000543", "54" vira "0,000054"
      return "0." + value.padStart(6, "0");
    }
    const integerPart = value.slice(0, -6);
    const decimalPart = value.slice(-6);
    return `${parseInt(integerPart, 10)},${decimalPart}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // Remove tudo que não for dígito ou vírgula
    val = val.replace(/[^0-9,]/g, "");

    // Remove vírgula para ficar só dígitos no raw
    const digitsOnly = val.replace(/,/g, "");

    setAmountRaw(digitsOnly);
  };

  const handleSend = () => {
    if (amountRaw.length === 0) return;

    // transforma para número com ponto decimal (6 casas)
    const valueStr =
      amountRaw.length <= 6
        ? "0." + amountRaw.padStart(6, "0")
        : amountRaw.slice(0, -6) + "." + amountRaw.slice(-6);

    const value = parseFloat(valueStr);

    if (isNaN(value) || value < MIN_VALUE) {
      alert(`Valor mínimo permitido é ${MIN_VALUE}`);
      return;
    }

    onSend(value);
    setAmountRaw("");
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
          type="text"
          placeholder="0.000001"
          className={styles.amountInput}
          value={formatAmount(amountRaw)}
          onChange={handleChange}
        />
      </div>

      <div className={styles.buttonWrapper}>
        <button onClick={handleSend}>Send Contribution</button>
      </div>
    </div>
  );
}
