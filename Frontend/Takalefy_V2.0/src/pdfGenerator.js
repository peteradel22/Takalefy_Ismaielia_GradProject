
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const formatDate = (date) => new Date(date).toLocaleDateString("en-US");

/**

 * @param {Array} transactions 
 * @param {string} title
 * @param {string} userName
 */
export const generatePdfFromTransactions = async(
    transactions,
    title = "Transactions",
    userName = ""
) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

   
    const blue = [0, 102, 204];

    
    doc.setFontSize(18);
    doc.setTextColor(...blue);
    doc.text("Takalefy", 14, 15);

    
    const now = formatDate(new Date());
    doc.setFontSize(12);
    doc.setTextColor(...blue);
    doc.text(now, pageWidth - 14, 15, { align: "right" });

   
    if (userName) {
        doc.setFontSize(12);
        doc.setTextColor(...blue);
        doc.text(`User: ${userName}`, 14, 23);
    }

   
    doc.setFontSize(16);
    doc.setTextColor(...blue);
    doc.text(title, pageWidth / 2, 30, { align: "center" });

    
    const headers = [
        ["Date", "Description", "Type", "Category", "Amount", "Note"]
    ];

   
    const rows = transactions.map((tx) => [
        formatDate(tx.occurred_at),
        tx.description || "-",
        tx.type || "-",
        tx.category || "-",
        `$${parseFloat(tx.amount).toFixed(2)}`,
        tx.note || "",
    ]);

    
    autoTable(doc, {
        startY: 35,
        head: headers,
        body: rows,
        styles: { font: "helvetica", fontSize: 12, textColor: blue },
        headStyles: { fillColor: blue, textColor: 255 },
        bodyStyles: { cellPadding: 5 },
        alternateRowStyles: { fillColor: [230, 242, 255] },
    });

    return doc.output("blob");
};


export const generateFullYearPdf = async(
    transactions,
    year,
    userName = ""
) => {
    return generatePdfFromTransactions(
        transactions,
        `All ${year} Transactions`,
        userName
    );
};


export const generateWeeklyPdfs = async(
    transactions,
    year,
    userName = ""
) => {
    const weeks = {};
    transactions.forEach((tx) => {
        const d = new Date(tx.occurred_at);
        const oneJan = new Date(d.getFullYear(), 0, 1);
        const week = Math.ceil(
            ((d - oneJan) / 86400000 + oneJan.getDay() + 1) / 7
        );
        const label = `Week ${week}, ${year}`;
        if (!weeks[label]) weeks[label] = [];
        weeks[label].push(tx);
    });

    const results = [];
    for (const [label, txs] of Object.entries(weeks)) {
        const blob = await generatePdfFromTransactions(txs, label, userName);
        results.push({ label, blob });
    }
    return results;
};


export const generateDailyPdfs = async(
    transactions,
    userName = ""
) => {
    const days = {};
    transactions.forEach((tx) => {
        const key = new Date(tx.occurred_at).toISOString().split("T")[0];
        if (!days[key]) days[key] = [];
        days[key].push(tx);
    });

    const results = [];
    for (const [key, txs] of Object.entries(days)) {
        const blob = await generatePdfFromTransactions(
            txs,
            `Transactions for ${key}`,
            userName
        );
        results.push({ label: key, blob });
    }
    return results;
};


function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}
