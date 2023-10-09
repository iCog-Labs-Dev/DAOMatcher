import { convertToCSV } from "./CSV";

export const handleDownloadClick = async () => {
  const csv = await convertToCSV(jsonData);
  if (csv) {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `user-data-${new Date().getTime()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
};
