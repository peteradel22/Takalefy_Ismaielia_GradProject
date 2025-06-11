import React from "react";
import { FaDownload } from "react-icons/fa";
import { generateFullYearPdf } from "../../pdfGenerator"; 
const FileManagerList = ({ transactions, userName }) => {
 
  const groupedByYear = transactions.reduce((acc, tx) => {
    const year = new Date(tx.occurred_at).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(tx);
    return acc;
  }, {});

  const handleDownloadYearPdf = async (year) => {
    const txs = groupedByYear[year] || [];
    try {
      const pdfBlob = await generateFullYearPdf(txs, year, userName);
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Takalefy_${year}_Transactions.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to generate PDF: " + err.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">File Manager</h3>
      {Object.keys(groupedByYear).length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedByYear).map(([year, txs]) => (
            <div
              key={year}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center space-x-4">
                <FaDownload className="text-gray-600" />
                <span className="text-gray-700">{`Download transactions for ${year} (${txs.length} items)`}</span>
              </div>
              <FaDownload
                onClick={() => handleDownloadYearPdf(year)}
                className="text-blue-500 cursor-pointer"
                title={`Download PDF for ${year}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileManagerList;
