import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import React, { useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import pb from "../lib/pocketbase";

export default function AddRTForm({ isOpen, setIsOpen }) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  async function handleSubmit(values) {
    setIsLoading(true);
    const toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
    });
    let rwId = (await pb.collection("rt").getOne(user.rt, { expand: "rw" }))
      .expand.rw.id;
    const data = {
      rw: rwId,
      name: values.name,
    };
    try {
          await pb.collection('rt').create(data).then((res) => {
          console.log("register", res);
          if (!res.error) {
            toast.fire({
              icon: res.error ? "error" : "success",
              title: res.error
                ? "An error occurred. Please try again later."
                : "Data RT berhasil ditambahkan!",
              padding: "10px 20px",
            });
          }
        });
    } catch (error) {
      console.log(error);
      toast.fire({
        icon: "error",
        title: "An error occurred. Please try again later.",
        padding: "10px 20px",
      });
    }
    setIsLoading(false);
    setIsOpen(false);
  }

  const validationSchema = Yup.object({
    name: Yup.number()
      .required("Nomor RT harus diisi")
      .typeError("Nomor RT harus berupa angka"),
  });

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto max-h-screen">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-bold text-center text-gray-900 dark:text-white">
                      Tambah Data RT Baru
                    </h3>
                    <Formik
                      initialValues={{
                        name: "",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ errors, touched }) => (
                        <Form className="space-y-4 md:space-y-6">
                          <div>
                            <label
                              htmlFor="name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Nomor RT
                            </label>
                            <Field
                              type="text"
                              name="name"
                              id="name"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                              placeholder="000"
                            />
                            {errors.name && touched.name ? (
                              <div className="text-sm text-red-500 mt-2">
                                {errors.name}
                              </div>
                            ) : null}
                          </div>
                          <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full text-white bg-slate-900 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800 ${
                              isLoading
                                ? "bg-slate-200 hover-slate-200"
                                : "bg-slate-700 hover:bg-slate-800 "
                            }`}
                          >
                            {isLoading ? (
                              <div
                                role="status"
                                className="flex justify-center my-auto"
                              >
                                <p className="my-auto">Loading... </p>
                                <svg
                                  aria-hidden="true"
                                  className=" w-6 h-6 mx-2 text-gray-200 animate-spin dark:text-gray-600 fill-slate-600"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <p>Submit</p>
                            )}{" "}
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
