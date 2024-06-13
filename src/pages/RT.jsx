import React, { useEffect, useState } from "react";
import CommonLayout from "../components/CommonLayout";
import Loading from "../components/Loading";
import RTTable from "../components/RTTable";
import { useAuth } from "../utils/AuthContext";
import pb from "../lib/pocketbase";

export default function RT() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchDatabase() {
    try {
      const res = await pb.collection("rt").getFullList({
        expand: "rw",
      });
      setData(res);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function subscribe(){
    pb.collection("rt").subscribe(
      "*",
      function (e) {
        console.log(e.action);
        console.log(e.record);
        fetchDatabase();
      }
    );
  
  }

  useEffect(() => {
    fetchDatabase();
    subscribe();
  }, []);

 
  const { user } = useAuth();
  return (
    <>
      <CommonLayout title="Manajemen RT">
        <RTTable data={data} edit={true} role={user.role} />
      </CommonLayout>
    </>
  );
}
