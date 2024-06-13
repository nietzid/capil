import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "@fontsource/roboto";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { PlusIcon } from "@heroicons/react/20/solid";
import Swal from "sweetalert2";
import AddRTForm from "./AddRTForm";
import RTDeleteConfirmation from "./RTDeleteConfirmation";
import EditRTForm from "./EditRTForm";
import pb from "../lib/pocketbase";

export default function RTTable(props) {
  const data = props.data;
  const [filteredData, setFilteredData] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [isOpenRTForm, setIsOpenRTForm] = useState(false);
  const [IsOpenEditRTForm, setIsOpenEditRTForm] = useState(false);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  const toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
  });

  async function checkRT() {
    const res = await pb.collection("users").getFullList({
      filter: `rt = "${selectedData?.id}"`,
    });
    console.log(res);
    if (res.length > 0) {
      toast.fire({
        icon: "error",
        title: "Tidak bisa menghapus RT yang masih memiliki warga!",
        padding: "10px 20px",
      });
    } else {
      setIsOpenDeleteDialog(true);
    }
  }

  const globalFilterFunction = (value) => {
    setGlobalFilterValue(value);
    setFilteredData(
      data.filter((item) => {
        return Object.values(item).some((val) =>
          String(val).toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  };

  async function editAction(rowData) {
    setSelectedData(rowData);
    setIsOpenEditRTForm(true);
  }

  function deleteAction(rowData) {
    setSelectedData(rowData);
  }

  useEffect(() => {
    if (selectedData && !IsOpenEditRTForm) {
      checkRT();
    }
  },[selectedData]);

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-mr-2"
          onClick={() => editAction(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => deleteAction(rowData)}
        />
      </React.Fragment>
    );
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <>
      <div className=" flex flex-col-reverse md:flex-row w-full justify-end md:justify-between mt-2">
        <input
          type="text"
          value={globalFilterValue}
          onChange={(e) => globalFilterFunction(e.target.value)}
          placeholder="Search..."
          className="w-full md:w-96 px-4 py-2 my-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-slate-200"
        />
        <div className="flex flex-row">
          <button
            type="button"
            className="text-slate-900 bg-white hover:bg-white-800 focus:ring-2 focus:outline-none focus:ring-slate-300 rounded-lg text-base p-2 px-4 my-auto h-fit text-center inline-flex items-center me-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
            onClick={() => setIsOpenRTForm(true)}
          >
            RT
            <PlusIcon className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
      <div className="p-1 md:p-4 bg-white rounded-xl">
        <DataTable
          value={filteredData}
          tableStyle={{ minWidth: "50rem" }}
          sortMode="multiple"
          paginator
          stripedRows
          removableSort
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          className="w-full text-base rounded-xl"
          globalFilter={globalFilterValue}
          emptyMessage="No data found."
        >
          <Column field="name" header="RT" sortable></Column>
          <Column field="expand.rw.name" header="RW" sortable></Column>
          {props.edit && (
            <Column
              body={actionBodyTemplate}
              header="Actions"
              align={"center"}
              className="w-32"
            />
          )}
        </DataTable>
      </div>
      <AddRTForm isOpen={isOpenRTForm} setIsOpen={setIsOpenRTForm} />
      {selectedData && (
        <EditRTForm
          rtdata={selectedData}
          isOpen={IsOpenEditRTForm}
          setIsOpen={setIsOpenEditRTForm}
        />
      )}

      <RTDeleteConfirmation
        open={isOpenDeleteDialog}
        setOpen={setIsOpenDeleteDialog}
        RTId={selectedData?.id}
      />
    </>
  );
}
