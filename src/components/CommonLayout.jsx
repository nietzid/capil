import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logo.svg";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CommonLayout(props) {
  const { user, logoutUser } = useAuth();
  const userNavigation = [
    { name: "Sign out", href: "#", onclick: () => logoutUser() },
  ];
  const userDataNav = {
    name: user.name,
    email: user.email,
    imageUrl: "https://api.dicebear.com/8.x/notionists/svg",
  };
  const navigation = [
    { name: "Dashboard", href: "/", current: location.pathname === "/" },
    { name: "Warga", href: "/warga", current: location.pathname === "/warga" },
    { name: "RT", href: "/rt", current: location.pathname === "/rt", class: user.role === "rw" ? "block" : "hidden" },
  ];

  return (
    <>
      <div className="min-h-full">
        <div className="bg-slate-900 pb-32">
          <Disclosure
            as="nav"
            className="border-b border-slate-300 border-opacity-25 bg-slate-900 lg:border-none"
          >
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                  <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-slate-400 lg:border-opacity-25">
                    <div className="flex items-center px-2 lg:px-0">
                      <div className="flex-shrink-0 ">
                        <img
                          className="block h-10 w-auto bg-white rounded-lg p-1"
                          src={Logo}
                          alt="Your Company"
                        />
                      </div>
                      <div className="hidden lg:ml-10 lg:block">
                        <div className="flex space-x-4">
                          {navigation.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-slate-100 text-slate"
                                  : "text-white hover:bg-slate-500 hover:bg-opacity-75",
                                "rounded-md py-2 px-3 text-sm font-medium",
                                item.class
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Search button
                    <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                      <div className="w-full max-w-lg lg:max-w-xs">
                        <label htmlFor="search" className="sr-only">
                          Search
                        </label>
                        <div className="relative text-gray-400 focus-within:text-gray-600">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <input
                            id="search"
                            className="block w-full rounded-md border border-transparent bg-white py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-600 sm:text-sm"
                            placeholder="Search"
                            type="search"
                            name="search"
                          />
                        </div>
                      </div>
                    </div>
                    */}

                    <div className="flex lg:hidden">
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-slate-600 p-2 text-slate-200 hover:bg-slate-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-600">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="hidden lg:ml-4 lg:block">
                      <div className="flex items-center">
                        {/* Notification button 

                        <button
                          type="button"
                          className="flex-shrink-0 rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        */}

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3 flex-shrink-0">
                          <div>
                            <Menu.Button className="flex rounded-full bg-slate-200 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-600">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={userDataNav.imageUrl}
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      href={item.href}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block py-2 px-4 text-sm text-gray-700"
                                      )}
                                      onClick={item.onclick}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="lg:hidden">
                  <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="Link"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-slate-700 text-white"
                            : "text-white hover:bg-slate-500 hover:bg-opacity-75",
                          "block rounded-md py-2 px-3 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="py-2">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0 ">
                        <img
                          className="h-10 w-10 rounded-full bg-white"
                          src={userDataNav.imageUrl}
                          alt="avatar"
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-white">
                          {user.name}
                        </div>
                        <div className="text-sm font-medium text-slate-400">
                          {user.email}
                        </div>
                      </div>
                      {/* notification button
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-slate-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      */}
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          onClick={item.onclick}
                          className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-slate-500 hover:bg-opacity-75"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <header className="p-4 md:pt-10">
            <div className="mx-auto max-w-7xl sm:px-4 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                {props.title}
              </h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            {/* Replace with your content 
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
            */}
            {props.children}
            {/* 
            </div>
            /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}
