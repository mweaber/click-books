import React from "react";
// import "./style.css";
import SearchArea from "../components/SearchArea";

const SearchResultArea = (props) => {
  return (
    <div>
      {props.searched ? (<div className="SearchResultArea">
        {props.searchResult.items.map(book => (
          <SearchArea
            book={book}
            key={book.id}
            save={props.save}
            bookIDs={props.bookIDs}
          />
        ))}
      </div>) : (<div></div>)
      }
    </div>

  )
}

export default SearchResultArea;