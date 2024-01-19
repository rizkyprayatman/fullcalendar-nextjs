import React, { useEffect } from "react";
import { useRouter } from "next/router";

function NavbarSection() {
  const router = useRouter();

  useEffect(() => {}, []);
  return (
    <>
      <nav className="bg-gray-100 ">
        <div className="max-w-6xl mx-auto px-2">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div>
                <button
                  onClick={() => router.push("/")}
                  className="
                  flex
                  items-center
                  py-5
                  px-2
                  pe-20
                  md:pe-1
                  text-gray-700
                  hover:text-gray-900
                "
                >
                  <span className="font-bold text-xl">Fullcalendar Next Js</span>
                </button>
              </div>

              <div className="hidden md:flex items-center space-x-1">
                <button
                  onClick={() => router.push("/")}
                  className="py-5 px-3 text-gray-700 hover:text-gray-900"
                >
                  Beranda
                </button>
              </div>
            </div>

            <div className="flex items-center"></div>

            <div className="md:hidden flex items-center">
              <button
                className="mobile-menu-button"
                onClick={() =>
                  document
                    .querySelector(".mobile-menu")
                    .classList.toggle("hidden")
                }
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mobile-menu hidden md:hidden">
          <button
            onClick={() => router.push("/")}
            className="block py-2 px-4 text-sm hover:bg-gray-200"
          >
            Beranda
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavbarSection;
