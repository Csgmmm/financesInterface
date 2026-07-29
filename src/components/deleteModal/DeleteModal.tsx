import { type ITransaction } from "../hooks/useTransactions";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import Button from "../button/Button";
import { Trash2 } from "lucide-react";
import styles from "./deleteModal.module.css";

type DeleteModalProps = {
  transaction: ITransaction | null;
  onClose: () => void;
};

function DeleteModal({ transaction, onClose }: DeleteModalProps) {
  // Se não houver transação selecionada, a modal nem é renderizada
  if (!transaction) return null;

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteDoc(doc(db, "transactions", transaction.id));
        onClose(); // Fecha a modal após apagar
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h4>Are you sure you want to delete {transaction.description}?</h4>
        <div className={styles.buttonsContainer}>
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="deleteSecondary"
            className={styles.deleteBtn}
            type="button"
            onClick={handleDelete}
          >
            <Trash2  />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
