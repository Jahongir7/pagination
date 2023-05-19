/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  /*data state*/
  const [data, setData] = useState([]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  const pNumber = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pNumber.push(i);
  }
  const paginatedData = data
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  function handleClick(param) {
    setCurrentPage(param);
  }
  return (
    <>
      <div className="allData">
        {paginatedData.map((item, index) => {
          return (
            <div className="eachPost" key={index}>
              <img src={item.image} alt="" />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
      {pNumber.map((item, index) => {
        return (
          <button key={index} onClick={() => handleClick(item)}>
            {item}
          </button>
        );
      })}
    </>
  );
}

export default App;
