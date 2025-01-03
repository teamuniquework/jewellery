"use client";
import { useState } from "react";
import Link from "next/link";
import { RiMenu3Line } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import { FiUser, FiHeart, FiSearch } from "react-icons/fi";
import CartSidebar from "./CartSidebar";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Custom link wrapper component
  const NavLink = ({ href, className, children }) => (
    <Link 
      href={href} 
      className={className}
      onClick={closeMobileMenu}
    >
      {children}
    </Link>
  );

  return (
    <>
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
          <NavLink href="/wishlist" className="text-3xl font-bold leading-none">
            <h1>Jewellery</h1>
          </NavLink>

          {/* Common icons visible across all screen sizes */}
          <div className="flex items-center">
            <button className="p-2 hover:bg-gray-100 rounded-full transition duration-200">
              <FiSearch className="w-5 h-5 text-gray-600" />
            </button>

            {/* Wishlist and Profile icons only visible on tablet and desktop */}
            <NavLink
              href="/wishlist"
              className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition duration-200"
            >
              <FiHeart className="w-5 h-5 text-gray-600" />
            </NavLink>
            <NavLink
              href="/profile"
              className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition duration-200"
            >
              <FiUser className="w-5 h-5 text-gray-600" />
            </NavLink>

            <CartSidebar />

            <button
              onClick={toggleMobileMenu}
              className="navbar-burger flex lg:hidden items-center text-black ml-5 p-2 bg-gray-100 rounded-full transition duration-200"
            >
              <RiMenu3Line className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
            <li>
              <NavLink
                href="/"
                className="text-base text-gray-600 font-medium hover:text-black"
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/shop"
                className="text-base text-gray-600 font-medium hover:text-black"
              >
                SHOP
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/about"
                className="text-base text-gray-600 font-medium hover:text-black"
              >
                ABOUT US
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/contact"
                className="text-base text-gray-600 font-medium hover:text-black"
              >
                CONTACT
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`navbar-menu relative z-50 transition-opacity duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
          onClick={toggleMobileMenu}
        ></div>
        <nav
          className={`fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r border-gray-200 shadow-lg overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center mb-8">
            <NavLink href="/" className="mr-auto text-3xl font-bold leading-none">
              <h1>Jewellery</h1>
            </NavLink>
            <button
              className="navbar-close p-1 bg-gray-100 rounded-full"
              onClick={toggleMobileMenu}
            >
              <IoCloseOutline className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-700 transition-all duration-500 hover:rotate-180" />
            </button>
          </div>

          <div>
            <ul>
              <li className="mb-1">
                <NavLink
                  href="/"
                  className="block p-4 text-sm font-semibold text-gray-700 hover:bg-slate-50 hover:text-black rounded"
                >
                  HOME
                </NavLink>
              </li>
              <li className="mb-1">
                <NavLink
                  href="/shop"
                  className="block p-4 text-sm font-semibold text-gray-700 hover:bg-slate-50 hover:text-black rounded"
                >
                  SHOP
                </NavLink>
              </li>
              <li className="mb-1">
                <NavLink
                  href="/about"
                  className="block p-4 text-sm font-semibold text-gray-700 hover:bg-slate-50 hover:text-black rounded"
                >
                  ABOUT US
                </NavLink>
              </li>
              <li className="mb-1">
                <NavLink
                  href="/contact"
                  className="block p-4 text-sm font-semibold text-gray-700 hover:bg-slate-50 hover:text-black rounded"
                >
                  CONTACT
                </NavLink>
              </li>
              <li className="mb-1 block md:hidden">
                <NavLink
                  href="/wishlist"
                  className="block p-4 text-sm font-semibold text-gray-700 hover:bg-slate-50 hover:text-black rounded"
                >
                  WISHLIST
                </NavLink>
              </li>
              <li className="mb-1 block md:hidden">
                <NavLink
                  href="/profile"
                  className="block p-4 text-sm font-semibold text-gray-700 hover:bg-slate-50 hover:text-black rounded"
                >
                  MY ACCOUNT
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="mt-auto">
            <div className="pt-6 block md:hidden">
              <NavLink
                href="/signin"
                className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-white text-black border-2 border-black rounded hover:bg-gray-100 transition duration-200"
              >
                Sign in
              </NavLink>
              <NavLink
                href="/signup"
                className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-black hover:bg-gray-900 rounded"
              >
                Sign Up
              </NavLink>
            </div>
            <p className="mt-4 text-xs text-center text-gray-400">
              <span>Copyright © 2024</span>
            </p>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;