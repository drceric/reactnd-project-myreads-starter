import React from 'react'
import * as BooksAPI from '../utils/BooksAPI'
import './App.css'
import Searchbar from './Searchbar.js'
import Shelf from './Shelf.js'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    books: []
  }

  onClickToMyBook = () => {
    this.setState({ showSearchPage: false})
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Searchbar
            onGoBack={this.onClickToMyBook}
            page={this.state.showSearchPage}
          />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Shelf />
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
