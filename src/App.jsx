import { useEffect, useState } from "react";
import "./App.css";
import BeerTable from "./components/BeerTable";
import { useSelector, useDispatch } from "react-redux";
import { getBeers, startLoading } from "./redux/beerSlice";
import { Route, Routes } from "react-router-dom";
import BeerDetail from "./components/BeerDetail";

export default function App() {
  const [currentPage, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [before, setBefore] = useState(null);
  const [after, setAfter] = useState(null);
  const { beers } = useSelector((state) => state);
  const { data: beerData, loading } = beers;
  const disptach = useDispatch();

  const debounce = (callback, delay) => {
    let debounceTimer;
    return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => callback.apply(this, args), delay);
    };
  };
  const fetchBeers = (page, before, after, per_page) => {
    disptach(startLoading("all"));
    disptach(
      after && before
        ? getBeers(
            `?per_page=${per_page}&page=${page}&brewed_before=${before}&brewed_after=${after}`
          )
        : before
        ? getBeers(`?per_page=${per_page}&page=${page}&brewed_before=${before}`)
        : after
        ? getBeers(`?per_page=${per_page}&page=${page}&brewed_after=${after}`)
        : getBeers(`?per_page=${per_page}&page=${page}`)
    );
  };

  useEffect(() => {
    fetchBeers(currentPage, before, after, perPage);
  }, [currentPage, before, perPage, after]);

  const handleDateChange = debounce((type, value) => {
    disptach(startLoading("all"));
    const formatedDate = value.split("-").reverse().join("-");
    if (type === "after") setAfter(formatedDate);
    else setBefore(formatedDate);
    setPage(1);
  }, 1000);

  const handleDropdownChange = (value) => {
    disptach(startLoading("all"));
    setPage(1);
    setPerPage(value);
  };

  const resetFilters = () => {
    setAfter(null);
    setBefore(null);
    setPerPage(10);
    const monthPickers = document.querySelectorAll(".month-selector");
    for (let picker = 0; picker < monthPickers.length; picker++) {
      monthPickers[picker].value = "";
    }
  };

  const renderBeerTable = () => (
    <BeerTable
      beers={beerData}
      loading={loading}
      currentPage={currentPage}
      setPage={setPage}
      handleDateChange={handleDateChange}
      handleDropdownChange={handleDropdownChange}
      per_page={perPage}
      resetFilters={resetFilters}
    />
  );

  const renderBeerDetail = () => <BeerDetail />;

  return (
    <div className="App" style={{ position: "relative" }}>
      <section className="beer_app section_padding">
        <h1 className="text-center">Kaay Labs</h1>
        <h6 className="text-center">(Task 1)</h6>
        <Routes>
          <Route path="/" element={renderBeerTable()} />
          <Route path="/:beerId" element={renderBeerDetail()} />
        </Routes>
        <footer className="m-2">
          <p className="text-center m-0">
            Made by <b>Arun</b>
          </p>
          <p className="text-center m-0">
            <a
              data-toggle="tooltip"
              data-placement="top"
              title="View source code"
              href="https://github.com/arunn911/beer-dom"
              target="_blank"
            >
              <img className="preview_icon" src="/eye.svg" alt="view source" />
            </a>
          </p>
        </footer>
      </section>
    </div>
  );
}
