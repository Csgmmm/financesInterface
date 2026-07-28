import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import TransationType from "../transactionType/TransactionType"; //importado o filho para o pai saiba que botao foi clicado e altere o valor do estado "type" para "income" ou "expense"
import Button from "../button/Button";
import styles from "./transactionRecord.module.css";

function TransationRecord() {
  const [description, setDescription] = useState(""); //função que guarda a description do input, para que o valor seja enviado para o firebase
  const [amount, setAmount] = useState(""); //função que guarda a amount do input, para que o valor seja enviado para o firebase
  const [type, setType] = useState<"expense" | "income">("expense"); //este estado esta no pai, para que o componente filho (TransationType) possa alterar o valor do estado "type" para "income" ou "expense" e o pai (TransationRecord) possa ler o valor atualizado deste estado

  const handleRecordTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return alert("Fill up the inputs");
    try {
      //depois, o firebase vai ser a variavel type e ver qual é o botão carregado
      await addDoc(collection(db, "transactions"), {
        description,
        amount: Number(amount),
        type,
        date: serverTimestamp(),
      });
 
    } catch (error) {
      return alert(error);
    }
  };

  return (
    <div>
      <h3 className="transationTitle">Add Transaction</h3>
      <h6 className="transationSubtitle">Update your records instantly</h6>
      <form onSubmit={handleRecordTransaction}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Description</label>
          <input
            type="text"
            placeholder="E.g. Groceries"
            className={styles.transactionInput}
            value={description}
            onChange={(e) => setDescription(e.target.value)} //O e.target.value captura o texto exato que está escrito no campo naquele milissegundo e atualiza o estado description com esse novo valor.
          />
          <label className={styles.label}>Amount</label>
          <input
            type="number"
            className={`${styles.transactionInput} ${type === "income" ? styles.incomeValue : styles.expenseValue}`}
            placeholder="0.00"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            
          />
        </div>
        <TransationType type={type} setType={setType} />
        {/* verifica que tipo é através do filho */}
        <div className={styles.btnRecord}>
          <Button variant="primary" type="submit">Add transaction</Button>
        </div>
      </form>
    </div>
  );
}

export default TransationRecord;
