import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import Bookgrid from './Bookgrid.js'

class Searchbar extends Component {
  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { onChangeView, page, books } = this.props
    const { query } = this.state

    let showResults
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showResults = books.filter((book) => match.test(book.id))
    } else {
      showResults = books
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => onChangeView()}>Close</a>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Bookgrid />
        </div>
      </div>
    )
  }
}

export default Searchbar
