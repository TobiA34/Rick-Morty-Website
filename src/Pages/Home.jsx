import React,{ useState, useEffect } from 'react'
import Search from "../components/Search/Search";
import Card from '../components/Card/Card';
import Pagination from "../components/Pagination/Pagination";
import Filter from "../components/Filter/Filter";
import axios from "axios";
 import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
 

function Home() {
    const [characters, setCharacters] = useState([]);
 let [pageNumber, updatePageNumber] = useState(1);
  let [status, updateStatus] = useState("");
  let [gender, updateGender] = useState("");
  let [species, updateSpecies] = useState("");
  let [search, setSearch] = useState("");
  let { info, results } = characters;
  const [order, setOrder] = useState("ASC");

  let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`;

    const sortASC = () => {
      if (order === "ASC") {
        const sorted = [...characters].sort((a, b) =>
          a["name"].toLowerCase() > b["name"].toLowerCase() ? 1 : -1
        );

        for (let item of Object.values(characters)) {
          /*rest of the code*/

        }
        setCharacters(sorted);
        setOrder("DSC");
      }
    };

    const sortDSC = () => {
      if (order === "DSC") {
        const sorted = [...characters].sort((a, b) =>
          a["name"].toLowerCase() < b["name"].toLowerCase() ? 1 : -1
        );
        setCharacters(sorted);
        setOrder("ASC");
      }
    };

  const getCharacters = async () => {
     try {
          const { data } = await axios.get(api);
          setCharacters(data);
        } catch (error) {
          console.log(error);
        }
  }
  useEffect(() => {
    getCharacters()
  }, [api]);

  return (
    <div className="App">
      <h1 className="text-center mb-3">Characters</h1>
      <Search
        setSearch={setSearch}
        updatePageNumber={updatePageNumber}
        searchVal={search}
      />
      <div className="container">
        <div className="row">
          {/* <DropdownButton
            className="m-5"
            id="dropdown-basic-button"
            title="sort items"
          >
            <Dropdown.Item onClick={() => sortASC()}>ASC</Dropdown.Item>
            <Dropdown.Item onClick={() => sortDSC()}>DSC</Dropdown.Item>
          </DropdownButton> */}
          <Filter
            pageNumber={pageNumber}
            status={status}
            updateStatus={updateStatus}
            updateGender={updateGender}
            updateSpecies={updateSpecies}
            updatePageNumber={updatePageNumber}
            setCharacters={setCharacters}
          />

          <div className="col-lg-8 col-12">
            <div className="row">
              <Card page="/" results={results} setCharacters = {setCharacters} />
            </div>
          </div>
        </div>
      </div>
      <Pagination
        info={info}
        pageNumber={pageNumber}
        updatePageNumber={updatePageNumber}
      />
    </div>
  );
};


export default Home
