import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from '../utils/BooksAPI'
import Bookgrid from './Bookgrid.js'

/**
This function is probably not necessary, if the API functions works as we expect
*/
const cleanResults = (books) => {
  //Remove the books that does not have an image
  books = books.filter(book => book.imageLinks && book.imageLinks.thumbnail)
  //When search for keyword "React", console log has reported the same id, this
  //basically try to avoid that
  let checkDict = {}
  let newBooks = []
  for (let book of books) {
    if (!checkDict[book.id]) {
      newBooks.push(book)
      checkDict[book.id] = true
    }
  }
  return newBooks
}

class Searchbar extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    searchBooks: []
  }

  upadteQuery = (query) => {
    this.setState({ query: query })
  }
  /**
    BooksAPI's search function works strangely and the doc is not clear so
    I end up doing the own version of "sync", I believe if I use the API
    update correctly, the search result should return me the correct  shelf info
    hopefully the api can be updated
    Also, this is a little bit coupled function because I try to avoid render
    refresh so frequently and let the query input trigger the search
  */
  onSearchBook = (query, myLibrary) => {
    this.upadteQuery(query)
    if (this.state.query !== '') {
      BooksAPI.search(this.state.query).then(books => {
        if (books && books.length > 0) {
          // if search return results
          for (let resultBook of books) {
            let exist = false
            for (let myBook of myLibrary) {
              if (myBook.id === resultBook.id) {
                exist = true
                resultBook.shelf = myBook.shelf
              }
            }
            if (!exist) {
              resultBook.shelf = "none"
            }
          }
          // remove the non exist books and remove duplicated search results
          this.setState({
            searchBooks: cleanResults(books)
          })
        } else {
          // either undefined or error message
          this.setState({ searchBooks: [] })
        }
      })
    } else {
      this.setState({ searchBooks: [] })
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
