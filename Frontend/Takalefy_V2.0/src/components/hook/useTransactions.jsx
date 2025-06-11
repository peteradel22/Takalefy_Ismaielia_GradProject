
import { useState, useEffect } from "react";
import { fetchData } from "../../api";
import { useUserId } from "../../context/UserProvider";

export default function useTransactions() {
  const { userId } = useUserId();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  useEffect(() => {
    if (!userId) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    const loadTransactions = async () => {
      try {
        
        const data = await fetchData(`/transactions`, { method: "GET" });
        
       
        const filteredTransactions = (data || []).filter(
          (tx) => String(tx.user_id) === String(userId)
        );
        
        setTransactions(filteredTransactions);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [userId]);

  return { transactions, loading, error };
}
