import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import Bookgrid from './Bookgrid.js'

class Searchbar extends Component {
  state = {
    query: '',
    searchBooks: []
  }

  upadteQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  // BooksAPI's search function works strangely and the doc is not clear so
  // I end up doing the own version of "sync"
  onSearchBook = (query, myLibrary) => {
    this.upadteQuery(query)
    if (this.state.query !== '') {
      BooksAPI.search(this.state.query).then(books => {
        if (books && books.length > 0) {
          // if search return results
          for (let resultBook of books) {
            let exist = false
            myLibrary.map((myBook) => {
              if (myBook.id === resultBook.id) {
                exist = true
                resultBook.shelf = myBook.shelf
              }
            })
            if (!exist) {
              resultBook.shelf = "none"
            }
          }
          // remove the non exist books and
          this.setState({
            searchBooks: books.filter(book => book.imageLinks && book.imageLinks.thumbnail)
          })
        } else {
          // either undefined or error message
          this.setState({ searchBooks: [] })
        }
      })
    }
  }

  render() {
    const { books, onChangeShelf } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.onSearchBook(e.target.value, books)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Bookgrid
            bookList={this.state.searchBooks}
            onChangeShelf={onChangeShelf}
          />
        </div>
      </div>
    )
  }
}

export default Searchbar
