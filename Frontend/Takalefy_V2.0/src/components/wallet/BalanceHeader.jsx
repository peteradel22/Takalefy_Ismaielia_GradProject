import { useState } from "react";
import AddTransactionModal from "../../pages/home/AddTransactionnB";
import useIncome from "../hook/useIncom";
const BalanceHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const { incomeTotal, fetchTransactions } = useIncome();
  const handleTransactionAdded = async () => {
    await fetchTransactions();
  };
  return (
    <>
      <div className="p-4 bg-white shadow rounded-lg flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">
            {new Date().toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>

          <p className="text-gray-500 mt-1">Total income</p>
          <h3 className="text-3xl font-bold">${incomeTotal}</h3>
        </div>
        <div>
          <button
            className="px-5 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
            onClick={() => setShowModal(true)}
          >
            + Add
          </button>
        </div>
      </div>
      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onTransactionAdded={handleTransactionAdded}
        />
      )}
    </>
  );
};

export default BalanceHeader;
