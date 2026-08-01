import { type ITransaction } from "../hooks/useTransactions";
import { auth, db } from "../../firebase";
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
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        // loggado: Apaga do Firebase Firestore
        await deleteDoc(doc(db, "transactions", transaction.id));
      } else {
        // não loggado: Apaga do sessionStorage do browser:
        //1.
        const sessionData = sessionStorage.getItem("temp_transactions");
        const currentList: ITransaction[] = sessionData
          ? JSON.parse(sessionData)
          : [];
        //Depois de buscar o conteúdo da chave "temp_transactions" do sessionStorage e guardá-lo na variável sessionData, crio uma variável chamada currentList. Ela é do tipo ITransaction[], o que significa que é um array de objetos da interface ITransaction.Se houver sessionData (ou seja, se não for null), o JSON.parse converte esse texto para um array de objetos, para que possamos usar metodos, como filter, map etc... Caso contrário, se estiver vazio, cria um array vazio ([])

        // 2. Compara se o id de cada item da lista é diferente do id da transação que queremos apagar.
        const updatedList = currentList.filter(
          (item) => item.id !== transaction.id,
        );

        // 3. Guarda a lista atualizada de volta no sessionStorage
        sessionStorage.setItem(
          "temp_transactions",
          JSON.stringify(updatedList),
        );

        // Notifica o useTransactions para atualizar o ecrã instantaneamente
        window.dispatchEvent(new Event("local-storage-update"));
      }

      onClose(); // Fecha a modal após apagar
    } catch (error) {
      console.error("Erro ao apagar:", error);
      alert(error);
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
            <Trash2 />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
