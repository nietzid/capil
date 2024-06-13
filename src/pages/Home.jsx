import React, { useState, useEffect } from "react";
import CommonLayout from "../components/CommonLayout";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import CountUp from "react-countup";
import WargaTable from "../components/WargaTable";
import { useAuth } from "../utils/AuthContext";
import Loading from "../components/Loading";
import pb from "../lib/pocketbase";

export default function Home() {
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([{}]);
  const { user } = useAuth();

  async function fetchDatabase(role) {
    try {
      const res = await pb.collection("users").getFullList({
        expand: "rt, rt.rw",
      });
      setData(res);
      let documents = res;
      switch (role) {
        case "kk":
          documents = documents.filter((doc) => doc.no_kk === user.no_kk);
          break;
        case "rt":
          documents = documents.filter(
            (doc) => doc.rt && doc.rt.id === user.rt
          );
          break;
        case "rw":
          documents = documents;
          break;
        default:
          documents = documents.filter((doc) => doc.user_id === user.$id);
          break;
      }
      setFilteredData(documents);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function subscribe() {
    pb.collection("users").subscribe(
      "*",
      function (e) {
        console.log(e.action);
        console.log(e.record);
        fetchDatabase(user.role);
      }
    );
  }

  const uniqueNoKkCount = new Set(data.map((item) => item.no_kk)).size;

  const uniqueRtCount = new Set(data.map((item) => item.rt)).size;

  useEffect(() => {
    fetchDatabase(user.role);
    setLoading(false);
    subscribe();
  }, []);

   return (
    <CommonLayout title="Dashboard">
      <div className="bg-white rounded-xl flex flex-col justify-center mt-8 p-2">
        <h1 className="text-center text-2xl md:text-3xl font-bold text-slate-900 mt-8">
          Statistik Warga
        </h1>
        <div className="flex flex-col md:flex-row w-full justify-center mt-8 gap-4 md:gap-8">
          <div className="flex flex-col rounded-xl shadow border border-1 w-full md:w-1/4">
            <p className="text-center my-2 text-black font-bold">
              Jumlah Warga
            </p>
            <div className="flex items-center justify-center h-full p-12">
              <CountUp
                start={0}
                end={data.length}
                duration={1}
                className="text-5xl font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="flex flex-col rounded-xl shadow border border-1 w-full md:w-1/4">
            <p className="text-center my-2 text-black font-bold">
              Jumlah Keluarga
            </p>
            <div className="flex items-center justify-center h-full p-12">
              <CountUp
                start={0}
                end={uniqueNoKkCount}
                duration={1}
                className="text-5xl font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="flex flex-col rounded-xl shadow border border-1 w-full md:w-1/4">
            <p className="text-center my-2 text-black font-bold">Jumlah RT</p>
            <div className="flex items-center justify-center h-full p-12">
              <CountUp
                start={0}
                end={uniqueRtCount}
                duration={1}
                className="text-5xl font-bold text-slate-900"
              />
            </div>
          </div>

          {/* <div className="flex flex-col rounded-xl shadow border border-1 w-full md:w-1/4">
            <p className="text-center my-2 text-black font-bold">
              Statistik Jenis Kelamin Warga
            </p>
            <div className="p-4">
              <Chart
                type="pie"
                data={chartData}
                options={chartOptions}
                title="123"
                className=""
              />
            </div>
          </div> */}
        </div>
        <h1 className="text-left text-2xl md:text-3xl font-bold text-slate-900 mt-8">
          Data Warga yang Kamu Kelola
        </h1>
        <WargaTable data={filteredData} edit={true} role={user.role} />
      </div>
    </CommonLayout>
  );
}
