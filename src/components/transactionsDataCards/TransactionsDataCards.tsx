import Card from "../cards/Cards";
import { type ITransaction } from "../hooks/useTransactions";

type TransactionsDataCardsProps = {
  transactions: ITransaction[];
};

function TransactionsDataCards({ transactions }: TransactionsDataCardsProps) {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income") //vai às transactions e filtra cada uma e verifica se o tipo é income
    .reduce((sum, transaction) => sum + transaction.amount, 0); //e depois, pega nessa lista e reduz num unico numero e o sum acumula e o transaction é o valor atual, e ambos são somados

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  return (
    <div className="summaryGrid">
      <Card variant="primary" className="incomeCard">
        <div className="incomeContainer">
          <h4 className="titleCards">Monthly Income</h4>
          <h3 className="incomeValue">${totalIncome.toFixed(2)}</h3>
        </div>
      </Card>

      <Card variant="primary">
        <h4 className="titleCards">Monthly Expenses</h4>
        <h3 className="expensesValue">${totalExpenses.toFixed(2)}</h3>
      </Card>

      <Card variant="primary">
        <h4 className="titleCards">Total balance</h4>
        <h3 className="balanceValue">${totalBalance.toFixed(2)}</h3>
      </Card>
    </div>
  );
}

export default TransactionsDataCards;
