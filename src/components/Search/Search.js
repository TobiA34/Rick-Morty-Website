import React from "react";
import styles from "./Search.module.scss";

const Search = ({ setSearch, updatePageNumber, searchVal }) => {
  let searchBtn = (e) => {
    e.preventDefault();
  };
  return (
    <form
      className={`${styles.search} d-flex flex-sm-row flex-column align-items-center justify-content-center gap-4 mb-5`}
    >
      <input
        onChange={(e) => {
          updatePageNumber(1);
          setTimeout(() => {
            console.log("====>", searchVal);
             setSearch(e.target.value);
          }, 4000);
        }}
        placeholder="Search for characters"
        className={styles.input}
        type="text"

      />
      <button
        onClick={searchBtn}
        className={`${styles.btn} btn btn-primary fs-5`}
      >
        Search
      </button>
    </form>
  );
};

export default Search;
