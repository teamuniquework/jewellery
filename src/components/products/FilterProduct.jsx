"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { IoCloseOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import ProductList from "./ProductList";
import { BsGrid } from "react-icons/bs";


const sortOptions = [
  { name: "Most Popular", value: "popular", current: true },
  { name: "Best Rating", value: "rating", current: false },
  { name: "Newest", value: "newest", current: false },
  { name: "Price: Low to High", value: "price-asc", current: false },
  { name: "Price: High to Low", value: "price-desc", current: false },
];

const initialFilters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: false },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "discounts",
    name: "Discounts",
    options: [
      { value: "50", label: "50%", checked: false },
      { value: "45", label: "45%", checked: false },
      { value: "40", label: "40%", checked: false },
      { value: "35", label: "35%", checked: false },
      { value: "25", label: "25%", checked: false },
      { value: "20", label: "20%", checked: false },
    ],
  },
  {
    id: "price",
    name: "Price",
    options: [
      { value: "0-50", label: "$0 - $50", checked: false },
      { value: "51-100", label: "$51 - $100", checked: false },
      { value: "101-200", label: "$101 - $200", checked: false },
      { value: "200+", label: "$200+", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FilterProduct() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [currentSort, setCurrentSort] = useState(sortOptions[0].value);
  const [gridView, setGridView] = useState("three");

  const handleSortChange = (sortValue) => {
    setCurrentSort(sortValue);
    // Update current status in sortOptions
    sortOptions.forEach((option) => {
      option.current = option.value === sortValue;
    });
  };

  const handleFilterChange = (sectionId, optionValue) => {
    setFilters((currentFilters) =>
      currentFilters.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            options: section.options.map((option) => {
              if (option.value === optionValue) {
                return { ...option, checked: !option.checked };
              }
              return option;
            }),
          };
        }
        return section;
      })
    );
  };

  const resetAllFilters = () => {
    setFilters(initialFilters);
  };

  const removeFilter = (sectionId, optionValue) => {
    handleFilterChange(sectionId, optionValue);
  };

  // Get active filters
  const activeFilters = filters.flatMap((section) =>
    section.options
      .filter((option) => option.checked)
      .map((option) => ({
        section: section.name,
        sectionId: section.id,
        value: option.value,
        label: option.label,
      }))
  );

  const renderActiveFilters = () => {
    if (activeFilters.length === 0) return null;

    return (
      <div className="bg-white py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Active Filters</h3>
          <button
            onClick={resetAllFilters}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Reset all
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => (
            <button
              key={`${filter.section}-${filter.value}`}
              onClick={() => removeFilter(filter.sectionId, filter.value)}
              className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              {filter.section}: {filter.label}
              <IoClose className="ml-1 h-4 w-4" />
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <IoCloseOutline
                    aria-hidden="true"
                    className="size-6 hover:text-gray-700"
                  />
                </button>
              </div>

              {/* Mobile Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="text-lg font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <FiChevronDown
                            aria-hidden="true"
                            className="size-5 group-data-[open]:hidden"
                          />
                          <FiChevronUp
                            aria-hidden="true"
                            className="size-5 group-[&:not([data-open])]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  value={option.value}
                                  checked={option.checked}
                                  onChange={() =>
                                    handleFilterChange(section.id, option.value)
                                  }
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-500 bg-white checked:border-black checked:bg-black indeterminate:border-black indeterminate:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-700 font-medium"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left -mr-10 lg:mr-10">
                <div>
                  <MenuButton className="group inline-flex justify-center text-base font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <FiChevronDown
                      aria-hidden="true"
                      className="-mr-1 ml-1 mt-[2px] size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <button
                          onClick={() => handleSortChange(option.value)}
                          className={classNames(
                            option.value === currentSort
                              ? "font-medium text-gray-900 bg-slate-50"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm w-full text-left data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          )}
                        >
                          {option.name}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <div className="ml-5 flex space-x-2 sm:ml-7">
                <button
                  type="button"
                  onClick={() => setGridView("two")}
                  className={classNames(
                    "-m-2 p-2",
                    gridView === "two"
                      ? "text-gray-900"
                      : "text-gray-400 hover:text-gray-500"
                  )}
                >
                  <span className="sr-only">View 2 per row</span>
                  <BsGrid aria-hidden="true" className="size-5 hidden lg:block" />
                </button>
                <button
                  type="button"
                  onClick={() => setGridView("three")}
                  className={classNames(
                    "-m-2 p-2",
                    gridView === "three"
                      ? "text-gray-900"
                      : "text-gray-400 hover:text-gray-500"
                  )}
                >
                  <span className="sr-only">View 3 per row</span>
                  <HiMiniSquares2X2 aria-hidden="true" className="size-5 hidden lg:block" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FaFilter aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            {/* Active filters section */}
            {renderActiveFilters()}

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                    defaultOpen={true}
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="text-lg font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <FiChevronDown
                            aria-hidden="true"
                            className="size-5 group-data-[open]:hidden"
                          />
                          <FiChevronUp
                            aria-hidden="true"
                            className="size-5 group-[&:not([data-open])]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  value={option.value}
                                  checked={option.checked}
                                  onChange={() =>
                                    handleFilterChange(section.id, option.value)
                                  }
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-500 bg-white checked:border-black checked:bg-black indeterminate:border-black indeterminate:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="text-sm text-gray-800 font-medium"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3 lg:border-l border-slate-200">
                <ProductList
                  activeFilters={activeFilters}
                  sortBy={currentSort}
                  gridView={gridView}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
