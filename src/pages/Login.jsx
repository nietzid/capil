import React, { useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function Login() {
  const { user, loginUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if (user) {
      navigate(from);
    }
  });

  function handleLogin(values) {
    const { email, password } = values;
    const toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
    });
    try {
      loginUser({ email, password }).then((res) => {
        toast.fire({
          icon: res.error ? "error" : "success",
          title: res.message,
          padding: "10px 20px",
        });
        if (!res.error) {
          console.log("Login Success");
          navigate(from, { replace: true });
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
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <div className="h-screen">
      {/* <section className="h-screen bg-[url('https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/background.jpg')] bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply bg-opacity-60"> */}
      <section className="h-screen bg-slate-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-3/4 md:h-screen pt:mt-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-white"
          >
            <img
              className="w-8 h-8 mr-2 bg-white rounded-lg p-1"
              src="/logo.svg"
              alt="logo"
            />
            CAPIL
          </a>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
            <div className="p-6 space-y-4 md:space-y-6 lg:space-y-8 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  remember: false,
                }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-4 md:space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
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
                        id="confirm-password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      />
                      {errors.password && touched.password ? (
                        <div className="text-sm text-red-500 mt-2">{errors.password}</div>
                      ) : null}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        {/* <div className="flex items-center h-5">
                          <Field
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            name="remember"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="remember"
                            className="text-gray-500 dark:text-gray-300"
                          >
                            Remember me
                          </label>
                        </div> */}
                      </div>
                      <Link
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-slate-900 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Log in to your account
                    </button>
                    <p className="text-sm font-light text-center text-gray-500 dark:text-gray-300">
                      <Link
                        to="/register"
                        className="font-medium text-slate-600 hover:underline dark:text-slate-500"
                      >
                        Don't have an account?
                      </Link>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
