import Dashboard from "@/components/Dashboard";
import { useState } from "react";
import { DataRow } from "@/types/data";

function DashboardPage() {
  const [data, setData] = useState<DataRow[]>([]);

  const handleReset = () => {
    setData([]);
  };

  return (
    <Dashboard data={data} fileName="sample-data.csv" onReset={handleReset} />
  );
}

export default DashboardPage;
