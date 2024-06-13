import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "@fontsource/roboto";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { PlusIcon } from "@heroicons/react/20/solid";
import AddWargaForm from "./AddWargaForm";
import Swal from "sweetalert2";
import EditWargaForm from "./EditWargaForm";
import ConfirmationDialog from "./ConfirmationDialog";

export default function WargaTable(props) {
  const data = props.data;
  const [filteredData, setFilteredData] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [isOpenWargaForm, setIsOpenWargaForm] = useState(false);
  const [IsOpenEditWargaForm, setIsOpenEditWargaForm] = useState(false);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
  });

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
    setIsOpenEditWargaForm(true);
  }

  async function deleteAction(rowData) {
    setSelectedData(rowData);
    setIsOpenDeleteDialog(true);
  }

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
  
  if(filteredData) console.log(filteredData);

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
          {(props.role == "rw" || props.role == "rt") && (
            <button
              type="button"
              className="text-white bg-slate-900 hover:bg-slate-800 focus:ring-2 focus:outline-none focus:ring-slate-300 rounded-lg text-base p-2 px-4 my-auto h-fit text-center inline-flex items-center me-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
              onClick={() => setIsOpenWargaForm(true)}
            >
              Warga
              <PlusIcon className="h-5 w-5 ml-2" />
            </button>
          )}
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
          <Column field="name" header="Nama" sortable></Column>
          <Column field="phone" header="Nomor"></Column>
          <Column field="expand.rt.name" header="RT" sortable></Column>
          <Column
            field="expand.rt.expand.rw.name"
            header="RW"
            sortable
          ></Column>
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
      <AddWargaForm isOpen={isOpenWargaForm} setIsOpen={setIsOpenWargaForm} />
      {data && (
        <EditWargaForm
          data={selectedData}
          isOpen={IsOpenEditWargaForm}
          setIsOpen={setIsOpenEditWargaForm}
        />
      )}
      <ConfirmationDialog
        open={isOpenDeleteDialog}
        setOpen={setIsOpenDeleteDialog}
        userId={selectedData?.id}
      />
    </>
  );
}
