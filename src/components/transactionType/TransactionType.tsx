
import Button from "../button/Button";
import styles from "./transationType.module.css";

type ITransationTypeProps = { 
  type: "expense" | "income"; 
  setType: (type: "expense" | "income") => void; //esta função é passada do pai para o filho, para que o filho possa alterar o valor do estado "type" no pai. O tipo da função é uma função que recebe um parâmetro do tipo "expense" | "income" e não retorna nada (void)
}

function TransationType({type, setType}:ITransationTypeProps ) {


  return (
    <div className={styles.btnContainer}>
      <Button 
        variant="toggle"
        type="button"
        isActive={type === "expense"} //se for do tipo expense, ele vai atualizar a class
        onClick={() => setType("expense")} //ao ser clicado, o valor da variavel muda de "type" para "expense"
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
  );
}

export default TransationType;

