import { useEffect, useState } from "react";
import { db, auth } from "../../firebase"; // Import do db e o auth
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"; // Para escutar o estado de login

export interface ITransaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: number;
  userId?: string;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<ITransaction[]>(() => {
    // lê do sessionStorage se não houver login. Apaga-se sozinho quando a janela fecha
    const sessionData = sessionStorage.getItem("temp_transactions"); //vai buscar os dados do sessionStorage, e guarda na variavel sessionData.
    return sessionData ? JSON.parse(sessionData) : []; // se existirem dados, Inicializa o estado com os dados do sessionStorage, senão com um array vazio
  });

  useEffect(() => {
    let disconnectFirestore: (() => void) | null = null; // variável para armazenar a função de desconexão do fs
    // Função para atualizar as transações do sessionStorage sem reload
    const handleSessionUpdate = () => {
      if (!auth.currentUser) {
        const sessionData = sessionStorage.getItem("temp_transactions");
        setTransactions(sessionData ? JSON.parse(sessionData) : []);
      }
    };

    // Escuta o nosso evento personalizado
    window.addEventListener("local-storage-update", handleSessionUpdate);
    // verifica se o utilizador está logado ou não
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      // Cancela a escuta anterior do Firestore se a autenticação mudar
      if (disconnectFirestore) {
        disconnectFirestore();
        disconnectFirestore = null;
      }

      if (user) {
        // logado, procura no Firebase apenas as transações deste utilizador
        const q = query(
          collection(db, "transactions"),
          where("userId", "==", user.uid), // 👈 Filtra apenas os dados do utilizador logado
          orderBy("date", "desc"),
        ); // Cria a regra de consulta para buscar à coleção "transactions" ordenada pela data do mais recente para o mais antigo

        disconnectFirestore = onSnapshot(q, (querySnapshot) => {
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
              userId: data.userId,
            }); // manda tudo gerado pelo Firebase e guarda-o no array list.
          });

          setTransactions(list); //atualiza o estado e mostra a lista
        });
      } else {
        // ou então, se nao houver login não faz chamadas ao Firebase, carrega só do sessionStorage
        const sessionData = sessionStorage.getItem("temp_transactions");
        setTransactions(sessionData ? JSON.parse(sessionData) : []);
      }
    });

    // Desconecta tanto o listener de autenticação como a ligação ao Firestore quando o componente desmonta
    return () => {
      unsubscribeAuth();
      if (disconnectFirestore) {
        disconnectFirestore();
      }
    };
  }, []); //Executa este código apenas uma vez, no momento em que a página carrega pela primeira vez.

  return { transactions };
}
