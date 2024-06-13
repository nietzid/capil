import React, { useEffect, useState } from "react";
import CommonLayout from "../components/CommonLayout";
import WargaTable from "../components/WargaTable";
import Loading from "../components/Loading";
import pb from "../lib/pocketbase";

export default function Warga() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchDatabase() {
    try {
      const records = await pb.collection("users").getFullList({
        expand: "rt, rt.rw",
      });
      console.log(records);
      setData(records);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchDatabase();
  }, []);

  return (
    <div>
      <CommonLayout title="Data Warga">
        <WargaTable data={data} edit={false} role="warga" />
      </CommonLayout>
    </div>
  );
}
