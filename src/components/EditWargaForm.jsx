import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import React, { useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import pb from "../lib/pocketbase";

export default function EditWargaForm({ data, isOpen, setIsOpen }) {
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUser } = useAuth();
  const [RtData, setRtData] = useState([{}]);

  async function handleSubmit(values) {
    setIsLoading(true);
    const toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
    });
    const userInfo = {
      email: values.email,
      emailVisibility: true,
      name: values.name,
      nik: values.nik,
      no_kk: values.no_kk,
      phone: values.telepon,
      role: values.is_kk ? "kk" : "warga",
      rt: values.rt,
      jk: values.jk,
    };
    if (values.password) userInfo.password = values.password;
    try {
      updateUser(data.id, userInfo).then((res) => {
        console.log("update", res);
        if (!res.error) {
          toast.fire({
            icon: res.error ? "error" : "success",
            title: res.error
              ? "An error occurred. Please try again later."
              : "Data berhasil diupdate!",
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
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(10, "Panjang password minimal 10 digit!"),
    confirmPassword: Yup.string(),
    nik: Yup.string()
      .length(16, "Panjang NIK harus 16 digit!")
      .required("Required"),
    no_kk: Yup.string()
      .length(16, "Panjang Nomor KK harus 16 digit!")
      .required("Required"),
    telepon: Yup.string().required("Required"),
    jk: Yup.string().required("Required"),
    rt: Yup.string().required("Required"),
    is_kk: Yup.boolean().required("Required"),
  });

  async function fetchRT() {
    setIsLoading(true);
    try {
      const res = await pb.collection("rt").getFullList({
        sort: "-name",
      });
      setRtData(res);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchRT();
  }, []);
  if (data)
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
                        Tambah Data Warga Baru
                      </h3>
                      <Formik
                        initialValues={{
                          name: data.name,
                          email: data.email,
                          password: "",
                          confirmPassword: "",
                          nik: data.nik,
                          no_kk: data.no_kk,
                          telepon: data.phone,
                          jk: data.jk,
                          rt: data.rt,
                          is_kk: data.role == "kk" ? true : false,
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
                                Nama
                              </label>
                              <Field
                                type="text"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Budi Santoso"
                              />
                              {errors.name && touched.name ? (
                                <div className="text-sm text-red-500 mt-2">
                                  {errors.name}
                                </div>
                              ) : null}
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Email
                              </label>
                              <Field
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="name@company.com"
                              />
                              {errors.email && touched.email ? (
                                <div className="text-sm text-red-500 mt-2">
                                  {errors.email}
                                </div>
                              ) : null}
                            </div>
                            <div>
                              <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Password
                              </label>
                              <Field
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                              />
                              {errors.password && touched.password ? (
                                <div className="text-sm text-red-500 mt-2">
                                  {errors.password}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <label
                                htmlFor="confirmPassword"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Konfirmasi Password
                              </label>
                              <Field
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                              />
                              {errors.confirmPassword &&
                              touched.confirmPassword ? (
                                <div className="text-sm text-red-500 mt-2">
                                  {errors.confirmPassword}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <label
                                htmlFor="nik"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                NIK
                              </label>
                              <Field
                                type="text"
                                name="nik"
                                id="nik"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="***************"
                              />
                              {errors.nik && touched.nik ? (
                                <div className="text-sm text-red-500 mt-2">
                                  {errors.nik}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <label
                                htmlFor="no_kk"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Nomor KK
                              </label>
                              <Field
                                type="text"
                                name="no_kk"
                                id="no_kk"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="***************"
                              />
                              {errors.no_kk && touched.no_kk ? (
                                <div className="text-sm text-red-500 mt-2">
                                  {errors.no_kk}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <label
                                htmlFor="telepon"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Nomor Telepon
                              </label>
                              <Field
                                type="text"
                                name="telepon"
                                id="telepon"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="08**********"
                              />
                              {errors.telepon && touched.telepon ? (
                                <div className="text-sm text-red-500 mt-2">
                                  {errors.telepon}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <label
                                htmlFor="jk"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Jenis Kelamin
                              </label>
                              <Field
                                as="select"
                                name="jk"
                                id="jk"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                              >
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="L">Laki-Laki</option>
                                <option value="P">Perempuan</option>
                              </Field>
                              {errors.jk && touched.jk ? (
                                <div className="text-sm text-red-500 mt-2">
                                  {errors.jk}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <label
                                htmlFor="rt"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Rukun Tetangga
                              </label>
                              <Field
                                as="select"
                                name="rt"
                                id="rt"
                                disabled={user.role == "rt"}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                              >
                                <option value="">Pilih Rukun Tetangga</option>
                                {RtData.map((item, index) => (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </Field>
                              {errors.rt && touched.rt ? (
                                <div className="text-sm text-red-500 mt-2">
                                  {errors.rt}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <label className="inline-flex items-center mb-5 cursor-pointer">
                                <Field
                                  id="is_kk"
                                  name="is_kk"
                                  type="checkbox"
                                  className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 dark:peer-focus:ring-slate-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-900"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                  Kepala Keluarga
                                </span>
                              </label>
                              {errors.is_kk && touched.is_kk ? (
                                <div className="text-sm text-red-500 mt-2">
                                  {errors.is_kk}
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
