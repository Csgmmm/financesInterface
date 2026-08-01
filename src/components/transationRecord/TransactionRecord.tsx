import { useState } from "react";
import { auth, db } from "../../firebase";
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
    const currentUser = auth.currentUser;
    if (currentUser) {
      // user logado: guarda permanentemente no Firebase
      try {
        await addDoc(collection(db, "transactions"), {
          description,
          amount: Number(amount),
          type,
          date: serverTimestamp(),
          userId: currentUser.uid,
        });
      } catch (error) {
        alert(error);
      }
    } else {
      // user não loggado: guarda no sessionStorage (só dura enquanto a janela estiver aberta)
      const newTransaction = {
        id: crypto.randomUUID(),
        description,
        amount: Number(amount),
        type,
        date: Date.now(),
      };
      const sessionData = sessionStorage.getItem("temp_transactions");
      const currentList = sessionData ? JSON.parse(sessionData) : [];
      const updatedList = [newTransaction, ...currentList];

      sessionStorage.setItem("temp_transactions", JSON.stringify(updatedList));

      // Atualiza a página para mostrar os dados novos na lista
      window.dispatchEvent(new Event("local-storage-update"));
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
          <Button variant="primary" type="submit">
            Add transaction
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TransationRecord;
