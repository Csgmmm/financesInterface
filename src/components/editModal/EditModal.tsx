import React, { useEffect, useState } from "react";
import styles from "./editModal.module.css";
import { db, auth } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { type ITransaction } from "../hooks/useTransactions";
import Button from "../button/Button";
import { X } from "lucide-react";

type EditModalProps = {
  //isto é o que o componente vai ficar à espera de receber sempre que for chamado noutros componentes
  transaction: ITransaction | null; //Uma transação individual ou null se estiver fechado
  onClose: () => void; // A função para fechar o modal
};

function EditModal({ transaction, onClose }: EditModalProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  // Preenche os campos do formulário assim que a transação é selecionada
  useEffect(() => {
    if (transaction) {
      setDescription(transaction.description);
      setAmount(transaction.amount.toString());
      setType(transaction.type);
    }
  }, [transaction]); //Sempre que clicas numa transação diferente para editar (ex: clicas no "Almoço", depois fechas e clicas no "Supermercado"), o valor de transaction muda. O useEffect percebe a mudança e atualiza os campos do formulário com os novos dados.

  if (!transaction) return null; // Se não houver transação selecionada, não mostra nada

  // Guardar Alterações
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // se estiver logado, atualiza no Firestore
      if (auth.currentUser) {
        await setDoc(
          doc(db, "transactions", transaction.id),
          {
            description,
            amount: Number(amount),
            type,
          },
          { merge: true }
        );
      } else {
        // se NÃO estiver logado, atualiza no sessionStorage
        const stored = sessionStorage.getItem("temp_transactions");
        if (stored) {
          const list: ITransaction[] = JSON.parse(stored);
          const updatedList = list.map((item) =>
            item.id === transaction.id
              ? { ...item, description, amount: Number(amount), type }
              : item
          );
          sessionStorage.setItem("temp_transactions", JSON.stringify(updatedList));
        }
      }

      onClose(); // Fecha a modal
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      {/* stopPropagation impede que o clique dentro da modal a feche */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Edit Transaction</h3>
          <Button
            variant="tertiary"
            type="button"
            className={styles.btnClose}
            onClick={onClose}
          >
            <X />
          </Button>
        </div>

        <form onSubmit={handleSave}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Description</label>
            <input
              type="text"
              value={description}
              className={styles.transactionInput}
              onChange={(e) => setDescription(e.target.value)} //dentro do input, ao user ir escrevendo, o setDescription vai atualizando de acordo com o que foi escrito
              required
            ></input>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Amount</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              className={styles.transactionInput}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className={styles.typeContainer}>
            <Button
              variant="toggle"
              type="button"
              isActive={type === "expense"}
              onClick={() => setType("expense")}
            >
              Expense
            </Button>
            <Button
              variant="toggle"
              type="button"
              isActive={type === "income"}
              onClick={() => setType("income")}
            >
              Income
            </Button>
          </div>

          <div className={styles.actions}>
            <div className={styles.buttons}>
              <Button variant="secondary" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
