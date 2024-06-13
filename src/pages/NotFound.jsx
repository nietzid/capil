import React from "react";
import notFound from "../assets/notfound.svg";
export default function NotFound() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <img
              className="mx-auto mb-4"
              src={notFound}
              alt="404 Not Found"
            />
            <h1 className="mb-4 text-2xl font-extrabold text-primary-600 dark:text-primary-500">
              404 Not Found
            </h1>
            <p className="mb-10 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Whoops! That page doesn’t exist.
            </p>
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              Here are some helpful links instead:
            </p>
            <ul className="flex justify-center items-center space-x-4 text-gray-500 dark:text-gray-400">
              <li>
                <a
                  href="#"
                  className="underline hover:text-gray-900 dark:hover:text-white"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="underline hover:text-gray-900 dark:hover:text-white"
                >
                  Search
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="underline hover:text-gray-900 dark:hover:text-white"
                >
                  Help
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="underline hover:text-gray-900 dark:hover:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
