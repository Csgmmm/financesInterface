import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

export interface ITransaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: number;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    const q = query(collection(db, "transactions"), orderBy("date", "desc")); // Cria a regra de consulta para buscar à coleção "transactions" ordenada pela data do mais recente para o mais antigo

    const disconnect = onSnapshot(q, (querySnapshot) => {
      //o onsnap fica a espera no firebase, usando a regra de consulta (q), e smp que ha alteração na coleção (alguem edita), o FB avisa o onSnapshot e envia uma "foto" (snapshot) com todos os dados para dentro do parametro querySnapshot
      const list: ITransaction[] = [];

      querySnapshot.forEach((doc) => {
        //Para cada documento (doc) existente dentro da foto de dados (querySnapshot), executa o seguinte bloco de código"
        const data = doc.data(); //le os dados desse documento (description, amount, type e date) e guarda no data
        
        // Converte o Timestamp do Firebase para milissegundos
        const transactionDate = data.date?.seconds
          ? data.date.seconds * 1000
          : Date.now();
          
        list.push({
          id: doc.id,
          date: transactionDate,
          description: data.description,
          amount: Number(data.amount) || 0,
          type: data.type,
        }); // manda tudo gerado pelo Firebase e guarda-o no array list.
      });

      setTransactions(list); //atualiza o estado e mostra a lista
    });

    return () => disconnect(); //Se o utilizador mudar de página ou fechar o componente, a função desconnect() fecha o canal de comunicação com o Firebase.
  }, []); //Executa este código apenas uma vez, no momento em que a página carrega pela primeira vez.

  return { transactions };
}
