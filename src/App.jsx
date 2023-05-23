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
  const [month, setMonth] = useState(null);
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
  const fetchBeers = (page, month, per_page) => {
    disptach(startLoading("all"));
    disptach(
      month
        ? getBeers(`?per_page=${per_page}&page=${page}&brewed_before=${month}`)
        : getBeers(`?per_page=${per_page}&page=${page}`)
    );
  };

  useEffect(() => {
    fetchBeers(currentPage, month, perPage);
  }, [currentPage, month, perPage]);

  const handleDateChange = debounce((value) => {
    disptach(startLoading("all"));
    const formatedDate = value.split("-").reverse().join("-");
    setMonth(formatedDate);
    setPage(1);
  }, 1000);

  const handleDropdownChange = (value) => {
    disptach(startLoading("all"));
    setPage(1);
    setPerPage(value);
  };
  
  const renderBeerTable = () => (
    <BeerTable
      beers={beerData}
      loading={loading}
      currentPage={currentPage}
      setPage={setPage}
      month={month}
      handleDateChange={handleDateChange}
      fetchBeers={fetchBeers}
      handleDropdownChange={handleDropdownChange}
      per_page={perPage}
    />
  );

  const renderBeerDetail = () => <BeerDetail />;

  return (
    <div className="App">
      <section className="beer_app section_padding">
        <h1 className="text-center">Kaay Labs</h1>
        <h6 className="text-center">(Task 1)</h6>
        <Routes>
          <Route path="/" element={renderBeerTable()} />
          <Route path="/:beerId" element={renderBeerDetail()} />
        </Routes>
      </section>
    </div>
  );
}
