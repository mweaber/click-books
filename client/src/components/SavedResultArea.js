import React, { Component } from "react";

import SavedBooks from "./SavedBooks";

class SavedResultArea extends Component {

  componentWillMount() {
    this.props.getSavedBooks();
  }

  render() {
    return (
      <div>
        {this.props.saved.length ?
          (<div className="SaveResultArea">
            {this.props.saved.map(book => (
              <SavedBooks 
              key={book._id} 
              book={book}
              changeRead={this.props.changeRead}
              deleteBook={this.props.deleteBook}
              />
            ))}
          </div>) :
          (<div className="banner">
            <h2>Save Books Here to Read Later</h2>
          </div>)
        }

      </div>

    )
  }

}

export default SavedResultArea;