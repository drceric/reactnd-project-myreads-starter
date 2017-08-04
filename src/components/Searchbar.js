import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import Bookgrid from './Bookgrid.js'

class Searchbar extends Component {
  state = {
    query: '',
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books => {
      this.setState({ books: books })
    }))
  }

  onAssignShelf = (book, shelf) => {
    this.setState((state) => {
      book.shelf = shelf
    })
    BooksAPI.update(book, shelf)
  }

  onSearchBook = (query) => {
    const maxResults = 20
    this.setState({ query: query })
    BooksAPI.search(query, maxResults).then((books) => {
      if (!books || books.hasOwnProperty("error")) {
        this.setState( { books: [] } )
      } else {
        this.setState( { books: books } )
      }
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/main"
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.onSearchBook(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Bookgrid
            bookList={this.state.books}
            onUpdateShelf={this.onAssignShelf}
          />
        </div>
      </div>
    )
  }
}

export default Searchbar
