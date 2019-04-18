import React, { Component } from "react";
import API from "./util/API";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SavedBooks from "./components/SavedBooks";
import SavedResultArea from "./components/SavedResultArea";
import SearchArea from "./components/SearchArea";
import SearchResultArea from "./components/SearchResultArea";
import ErrorPage from "./components/ErrorPage";

import "./App.css";

class App extends Component {
  state = {
    seacrchTerm: "title",
    title: "",
    author: "",
    searchResult: {},
    searched: false,
    saved: [], 
    bookIDs: [],
  }

  componentDidMount() {
    this.getSavedBooks()
  }

  getSavedBooks = () => {
    API.getSavedBooks()
      .then(res => {
        console.log(res.data);
        const bookIDs = res.data.map(book => book.bookID)
        return this.setState({ saved: res.data , bookIDs: bookIDs})
      })
      .catch(err => console.log(err));
  }

  handleInputChange = (event) => {

    const lookUp = event.target.value;
    if (this.state.searchTerm === "title") {
      return this.setState({ title: lookUp })
    }
    return this.setState({ author: lookUp });
  }

  changeSearchTerm = (event) => {
    event.preventDefault();
    const type = event.target.value;
    this.setState({ searchTerm: type, title: "", author: "" });
  }

  search = (event) => {
    event.preventDefault();
    if (this.state.searchTerm === "title") {
      API.searchTitle(this.state.title)
        .then(res => {
          console.log(res.data)
          const bookIDs = res.data.items.map(book => book.id);
          console.log(bookIDs);
          this.setState({ searchResult: res.data, searched: true })
        })
        .catch(err => console.log(err));
    } else {
      API.searchAuthor(this.state.author)
        .then(res => {
          console.log(res.data);
          this.setState({ searchResult: res.data, searched: true })
        })
        .catch(err => console.log(err));
    }
  }

  changeRead = (event) => {
    event.preventDefault();
    const {read, id} = event.target.dataset;
    console.log(read, !read, id)
    console.log(typeof read)
    const newRead = read ==="true"? false: true;
    API.changeRead(id, newRead)
      .then(res => {
        console.log(res);
        this.getSavedBooks();

      })
      .catch(err => console.log(err))
  }

  deleteBook = (event) => {
    event.preventDefault();
    const id = event.target.dataset.id;
    API.deleteBook(id)
      .then(res => {
        console.log(res);
        this.getSavedBooks()
      })
      .catch(err => console.log(err));
  }
  
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path = "/" render = {props => (
            <div className = "container">
              <SearchBar
                changeSearchTerm={this.changeSearchTerm}
                title={this.state.title}
                author={this.state.author}
                handleInputChange={this.handleInputChange}
                searchTerm={this.state.searchTerm}
                search={this.search}
              />
              <SearchResultArea
                searchResult={this.state.searchResult}
                searched={this.state.searched}
                save={this.save}
                bookIDs={this.state.bookIDs}
              />
            </div>
          )} /> 
          <Route exact path = "/saved" render = {props => (
            <div className="container">
            <SavedResultArea 
              saved={this.state.saved}
              getSavedBooks={this.getSavedBooks}
              changeRead={this.changeRead}
              deleteBook={this.deleteBook}
            />
          </div>
          )} /> 
         <Route component = {ErrorPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
