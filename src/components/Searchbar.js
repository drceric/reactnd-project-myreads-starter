import React, { Component } from 'react'
/**import escapeRegExp from 'escape-string-regexp'**/
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
          <Bookgrid
            page={page}
            bookList={books}
          />
        </div>
      </div>
    )
  }
}

export default Searchbar
