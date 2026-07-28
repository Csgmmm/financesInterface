import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Card from "./components/cards/Cards";
import TransactionRecord from "./components/transationRecord/TransactionRecord";
import RecentTransactions from "./components/recentTransactions/RecentTransactions";
import TransactionsDataCards from "./components/transactionsDataCards/TransactionsDataCards";
import { useTransactions } from "./components/hooks/useTransactions";
import { useState } from "react";
import Footer from "./components/footer/Footer";

function App() {
const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", nextTheme);
    setTheme(nextTheme);
  };
  const { transactions } = useTransactions();

  return (
    <div className="appContainer">
      <nav>
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
      </nav>
      <section className="generalContainer">
        <TransactionsDataCards transactions={transactions} />
        
        <div className="transationsGrid">
          <Card variant="primary">
            <TransactionRecord />
          </Card>

          <Card variant="primary">

            <RecentTransactions transactions={transactions} theme={theme} />
          </Card>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default App;