import EmptyState from "../emptyState/EmptyState";
import styles from "./recentTransactions.module.css";
import { type ITransaction } from "../hooks/useTransactions";
import EditModal from "../editModal/EditModal";
import { useState } from "react";
import Button from "../button/Button";
import { Pencil } from "lucide-react";

interface RecentTransactionsProps {
  transactions: ITransaction[]; // Recebe o array de transações do pai
  theme: string;
}

function RecentTransactions({ transactions, theme }: RecentTransactionsProps) {
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null); //preciso de um estado pq é aqui que vai ser selecionado o item para a modal
  return (
    <>
      <h3 className={styles.transationTitle}>Recent Transactions</h3>
      {transactions.length === 0 ? (
        <div className={styles.emptyStateContainer}>
          <EmptyState currentTheme={theme} />
          {/* currentTheme é o nome da prop que o emptystate espera receber e o theme, é a variavel de estado, que quando dá trigger, ele chama a variavel de estado que está na App.tsx, que é o brain do theme. Ou seja, se mudar o theme, o emptystate tambem vai mudar */}
          <h4 className={styles.emptyStateTitle}>No transactions yet</h4>
          <h5 className={styles.emptyStateSubtext}>
            Start by adding your first record.
          </h5>
        </div>
      ) : (
        <div className={styles.transactionsList}>
          {transactions.map((transaction) => {
            const isIncome = transaction.type === "income";
            const sign = isIncome ? "+" : "-";

            return (
              <div key={transaction.id} className={styles.transactionCard}>
                <div className={styles.data}>
                  <div className={styles["description-date"]}>
                    <h4>{transaction.description}</h4>

                    <span className={styles.date}>
                      {new Date(transaction.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <span className={isIncome ? styles.income : styles.expense}>
                    {sign}${transaction.amount.toFixed(2)}
                  </span>
                </div>
                <Button
                  variant="tertiary"
                  className={styles.editButton}
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  <Pencil size={18} />
                </Button>
                {/* Ao clicar, ele vai atualizar o estado de acordo com os dados da transação */}
              </div>
            );
          })}
        </div>
      )}
      <EditModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
      {/* o prop da editmodal é transaction, e  o selectedTransaction é a variável de estado que contém a transação selecionada após o clique. PS: O que vai renderizar e atualizar o estado é o setSelectedTransaction. 
      E depois, ao fechar, executa uma função que define null a transação selecionada. */}
    </>
  );
}

export default RecentTransactions;
