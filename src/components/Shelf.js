import React from 'react'
import { Link } from 'react-router-dom'
import Bookgrid from './Bookgrid.js'
import PropTypes from 'prop-types'

const shelves = ["Currently Reading", "Want to Read", "Read"]
const shelfToKey = {
  "Currently Reading": "currentlyReading",
  "Want to Read": 'wantToRead',
  "Read": "read"
}

const Shelf = (props) => {
  const { books, onChangeShelf } = props
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((categ) => {
            return (
              <div className="bookshelf" key={categ}>
                <h2 className="bookshelf-title">{categ}</h2>
                <div className="bookshelf-books">
                  <Bookgrid bookList={books.filter(b => b.shelf === shelfToKey[categ])}
                            onChangeShelf={onChangeShelf}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default Shelf
