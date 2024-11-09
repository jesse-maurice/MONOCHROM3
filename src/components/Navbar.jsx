/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useState,
} from 'react';

import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import {
  FaAngleDown,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';
import { FaEllipsis } from 'react-icons/fa6';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { auth } from '../../firebase';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);



  const toggleExploreDropdown = () => {
    setIsExploreOpen(!isExploreOpen);
  };

  const toggleDotDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleNavMenu = () => {
    setIsNavOpen(!isNavOpen);
  };



  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/SignUp");
  };

  
  return (
    <>
      <div className=" w-full flex bg-[#0f0f0f] pb-5 flex-col items-center">
        <div
          className={`z-10 py-0 flex flex-row items-center content-center justify-between w-full  border-box px-10 max-sm:px-4 md:px-10 lg:px-10 xl:px-10 2xl:px-10 ${
            isSticky ? "sticky top-0 bg-[#0f0f0f]" : ""
          } `}
        >
          <h1 className="flex items-center justify-center pt-2 font-high text-[50px] max-sm:text-[40px] text-[#ffffff]">
            m
          </h1>
          <div className="flex items-center font-jakarta lg:gap-8 2xl:gap-8 max-sm:gap-3 md:gap-4">
            <div
              className="relative flex items-center gap-2 max-sm:hidden md:inline-flex lg:inline-flex 2xl:inline-flex"
              onClick={toggleExploreDropdown}
            >
              <p className="text-[16px] font-semibold leading-[26px] text-white cursor-pointer hover:text-gray-300">
                Explore
              </p>
              <FaAngleDown
                className={`fa-solid fa-angle-down fa-xs mt-1 cursor-pointer ${
                  isExploreOpen ? "rotate-180" : ""
                }`}
                style={{ color: "#ffffff" }}
              />
              {isExploreOpen && (
                <div className="absolute z-20 bg-white rounded-lg shadow-lg -right-6 top-12 w-44">
                  <div className="tooltip-arrow"></div>
                  <div className="flex flex-col w-full py-2 font-semibold font-jakarta">
                    <a
                      href="/"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Discover Photos
                    </a>
                    <a
                      href="/"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Popular searches
                    </a>
                    <a
                      href="/"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Leaderboard
                    </a>
                    <a
                      href="/"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Challenges
                    </a>
                    <a
                      target="_blank"
                      href="https://monoblog.framer.website/"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Blog
                    </a>
                  </div>
                </div>
              )}
            </div>
            <Link to={"/Blog"}>
              <p className="text-[16px] font-semibold leading-[26px] text-white cursor-pointer max-sm:hidden md:inline-flex lg:inline-flex 2xl:inline-flex hover:text-gray-300">
                Blog
              </p>
            </Link>

            <div className="relative max-sm:hidden md:inline-flex lg:inline-flex 2xl:inline-flex">
              <FaEllipsis
                className="text-white cursor-pointer fa-solid fa-ellipsis"
                style={{ color: "#ffffff" }}
                onClick={toggleDotDropdown}
              />
              {isOpen && (
                <div className="absolute z-20 mt-10 bg-white rounded-lg shadow-lg -right-6 w-44">
                  <div className="tooltip-arrow"></div>
                  <div className="flex flex-col w-full py-2 font-semibold font-jakarta">
                    <a
                      href="/Login"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Login
                    </a>
                    <div className="w-full h-[1px] bg-gray-100"></div>
                    <a
                      href="/SignUp"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Join
                    </a>
                    <a
                      href="/"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Image & Video API
                    </a>
                    <a
                      href="/"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      FAQ
                    </a>
                    <a
                      href="/"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Partnerships
                    </a>
                    <div className="w-full h-[1px] bg-gray-100"></div>
                    <div className="flex items-center w-full gap-4 px-4 py-2">
                      <a
                        target="_blank"
                        href="https://twitter.com/i_am_monochrome"
                        rel="noreferrer"
                      >
                        <i className="fa-brands fa-x-twitter"></i>
                      </a>
                      <a
                        target="_blank"
                        href="https://www.instagram.com/i.am.monochrome/"
                        rel="noreferrer"
                      >
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* <div className="relative flex items-center">
              {user && (
                <>
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </>
              )}
            </div> */}

            <Link to={user ? "/Upload" : "/SignUp"}>
              <button
                className={` flex items-center max-sm:hidden justify-center text-white tracking-wider px-[16px] outline-none border-none max-sm:py-[7px] font-semibold max-sm:px-[20px] max-sm:text-base md:text-lg 2xl:text-[16px] 2xl:leading-[20.8px] transition ease-in delay-150 hover:translate-y-1 hover:scale-40 duration-300 py-[10px] rounded-lg`}
                type="submit"
                onClick={user ? handleLogout : null}
              >
                {user ? "Upload" : "Join"}
              </button>
            </Link>
            <div className="items-center justify-center gap-1 max-sm:flex md:hidden lg:hidden 2xl:hidden">
              <div className=" w-1 h-1 bg-[#ffffff] rounded-full"></div>
              <p
                className="text-lg font-normal text-white font-jakarta"
                onClick={toggleNavMenu}
              >
                menu
              </p>
            </div>

            {/* <i
              className="fa-solid fa-bars fa-lg md:hidden lg:hidden 2xl:hidden"
              style={{ color: "#ffffff" }}
              onClick={toggleNavMenu}
            ></i> */}
            {isNavOpen && (
              <div className="fixed inset-0 z-50 bg-black">
                <nav className="fixed top-0 left-0 flex flex-col items-start w-full h-full px-5 ">
                  <div className="flex items-center w-full gap-4 ">
                    <h1 className="font-high text-[50px] mt-5 max-sm:text-[40px] text-[#ffffff]">
                      m
                    </h1>
                    <form className="w-full max-sm:max-w-[230px] lg:max-w-lg md:max-w-2xl">
                      <div className="relative flex items-center">
                        <i className="fa-solid absolute w-[5px] h-[5px] pointer-events-none ml-3 fa-magnifying-glass fa-beat-fade"></i>
                        <input
                          type="text"
                          name="search"
                          placeholder="Search Images..."
                          autoComplete="off"
                          className="w-full px-3 py-[4px] md:py-[7px] mt-3 pl-10 font-medium placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2 font-sans"
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                        ></input>
                      </div>
                    </form>
                  </div>
                  <div className=" w-full h-[0.2px] mt-3 bg-gray-700"></div>
                  <ul className="flex flex-col items-start text-xl font-semibold text-white font-jakarta ">
                    <li className="py-2 mt-4 hover:text-gray-300">
                      <a href="/">Home</a>
                    </li>
                    <li className="py-2 hover:text-gray-300">
                      <a href="/">Discover Photos</a>
                    </li>
                    <li className="py-2 hover:text-gray-300">
                      <a href="/">Popular Searches</a>
                    </li>
                    <li className="py-2 hover:text-gray-300">
                      <a href="/">Free Videos</a>
                    </li>
                    <li className="py-2 hover:text-gray-300">
                      <a href="/">Challenges</a>
                    </li>
                    <li className="py-2 hover:text-gray-300">
                      <a
                        target="_blank"
                        href="https://monoblog.framer.website/"
                      >
                        Blog
                      </a>
                    </li>
                  </ul>
                  <div className=" w-full h-[0.2px] mt-6 bg-gray-700"></div>
                  <ul className="flex flex-col items-start text-xl font-semibold text-white font-jakarta">
                    <li className="py-2 mt-6 hover:text-gray-300">
                      <a href="/Login">Login</a>
                    </li>
                    <li className="py-2 hover:text-gray-300">
                      <a href="/SignUp">Join</a>
                    </li>
                  </ul>
                  <div className=" w-full h-[0.2px] mt-6 bg-gray-700"></div>
                  <ul className="flex flex-col items-start text-xl font-semibold text-white font-jakarta">
                    <li className="py-2 mt-6 hover:text-gray-300">
                      <a href="/">FAQ</a>
                    </li>
                    <li className="py-2 hover:text-gray-300">
                      <a href="/">About Us</a>
                    </li>
                  </ul>
                  <div className=" w-full h-[0.2px] my-6 bg-gray-700"></div>
                  <div className="flex items-center w-full gap-10">
                    <a
                      target="_blank"
                      href="https://twitter.com/i_am_monochrome"
                      rel="noreferrer"
                    >
                      <i
                        className="fa-brands fa-x-twitter fa-2xl"
                        style={{ color: "#ffffff" }}
                      ></i>
                    </a>
                    <a
                      target="_blank"
                      href="https://www.instagram.com/i.am.monochrome/"
                      rel="noreferrer"
                    >
                      <i
                        className="fa-brands fa-instagram fa-2xl"
                        style={{ color: "#ffffff" }}
                      ></i>
                    </a>
                  </div>
                  <button
                    className="absolute p-4 right-1 top-4 md:top-6"
                    onClick={toggleNavMenu}
                  >
                    <i className="text-white fas fa-times fa-xl"></i>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
        <div className="w-full overflow-hidden font-high">
          <h4
            className="text-[220px] font-bold text-center text-white"
            style={{ whiteSpace: "nowrap" }}
          >
            monochrome.
          </h4>
        </div>
        <div className="items-end justify-end w-full gap-4 px-10 max-sm:hidden md:hidden lg:flex">
          <a href="/">
            <div className="w-12 h-12 rounded-full flex items-center border-[1px] border-white justify-center transition-colors duration-1000 hover:text-blue-500">
              <FaTwitter className="text-2xl text-white transition-all ease-in fa-brands fa-linkedin-in hover:text-black" />
            </div>
          </a>
          <a href="/">
            <div className="w-12 h-12 rounded-full flex items-center border-[1px] border-white justify-center transition-colors duration-1000 hover:text-blue-500">
              <FaInstagram className="text-2xl text-white transition-all ease-in fa-brands fa-linkedin-in hover:text-black" />
            </div>
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/webdevmaurice/"
            rel="noreferrer"
          >
            <div className="w-12 h-12 rounded-full flex items-center border-[1px] border-white justify-center transition-colors duration-1000 hover:text-blue-500">
              <FaLinkedin className="text-2xl text-white transition-all ease-in fa-brands fa-linkedin-in hover:text-black" />
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default Navbar