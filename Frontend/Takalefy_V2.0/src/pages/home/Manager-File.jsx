import React, { useEffect, useState } from "react";
import Navbar from "../../components/file-manager/Navbar";
import FileList from "../../components/file-manager/FileList";
import { useUserId } from "../../context/UserProvider";
import { fetchData } from "../../api";
import {
  generatePdfFromTransactions,
  generateFullYearPdf,
  generateWeeklyPdfs,
  generateDailyPdfs,
} from "../../pdfGenerator";

const ManagerFile = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const { userId } = useUserId();
  const [filter, setFilter] = useState("monthly"); 
  const [userName, setUserName] = useState("");

 
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await fetchData(`/auth/profile`);
        setUserName(profile.name || profile.username || "");
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    if (userId) loadProfile();
  }, [userId]);

  
  useEffect(() => {
    const loadAndGenerateFiles = async () => {
      setLoading(true);
      try {
        const allTransactions = await fetchData(`/transactions`);
        const userTransactions = allTransactions.filter(
          (tx) => String(tx.user_id) === String(userId)
        );

        const filtered = userTransactions.filter(
          (tx) =>
            new Date(tx.occurred_at).getFullYear() === selectedYear
        );

        let generatedFiles = [];

        if (filtered.length > 0) {
          if (filter === "monthly") {
            const groupedByMonth = {};
            filtered.forEach((tx) => {
              const date = new Date(tx.occurred_at);
              const month = date.toLocaleString("default", {
                month: "long",
              });
              const key = `${month}, ${selectedYear}`;
              groupedByMonth[key] = groupedByMonth[key] || [];
              groupedByMonth[key].push(tx);
            });
            generatedFiles = await Promise.all(
              Object.entries(groupedByMonth).map(
                async ([label, txs]) => {
                  const blob = await generatePdfFromTransactions(
                    txs,
                    label,
                    userName
                  );
                  return {
                    name: `${label} Spendings`,
                    url: URL.createObjectURL(blob),
                  };
                }
              )
            );
          } else if (filter === "weekly") {
            const weekly = await generateWeeklyPdfs(
              filtered,
              selectedYear,
              userName
            );
            generatedFiles = weekly.map((w) => ({
              name: w.label,
              url: URL.createObjectURL(w.blob),
            }));
          } else if (filter === "daily") {
            const daily = await generateDailyPdfs(filtered, userName);
            generatedFiles = daily.map((d) => ({
              name: d.label,
              url: URL.createObjectURL(d.blob),
            }));
          } else if (filter === "full") {
            const blob = await generateFullYearPdf(
              filtered,
              selectedYear,
              userName
            );
            generatedFiles = [
              {
                name: `All ${selectedYear} Transactions`,
                url: URL.createObjectURL(blob),
              },
            ];
          }
        }

        setFiles(generatedFiles);
      } catch (err) {
        console.error("Error loading transactions:", err);
        setFiles([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) loadAndGenerateFiles();
  }, [selectedYear, userId, filter, userName]);

  return (
    <div className="p-6">
      <Navbar
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
        filter={filter}
        onSelectFilter={setFilter}
      />
      <h2 className="text-2xl font-bold mt-6">File Manager</h2>
      <FileList files={files} loading={loading} />
    </div>
  );
};

export default ManagerFile;
