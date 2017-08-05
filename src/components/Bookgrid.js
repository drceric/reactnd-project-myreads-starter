import React from 'react'
import PropTypes from 'prop-types'

/**
Both Book and Bookgrid are stateless components, and since Book lives inside Bookgrid
these two components are put in a single component file
*/
const Book = (props) => {
  const { book, onChangeShelf } = props
  if (!book.hasOwnProperty("authors")) {
    book.authors = []
  }
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
          width: 128,
          height: 193,
          backgroundImage: `url(${book.imageLinks.thumbnail})`
        }}></div>
        <div className="book-shelf-changer">
          <select value={book.shelf} onChange={e => {
            onChangeShelf(book, e.target.value)
          }}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">
        <a href={book.previewLink} target="_blank" className="book-link">{book.title}</a>
      </div>
      {book.authors.map((author) => {
        return (
          <div className="book-authors" key={author}>{author}</div>
        )
      })
}
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

const Bookgrid = (props) => {
  const { bookList, onChangeShelf } = props
  return (
    <ol className="books-grid">
      {bookList.map((book) => {
        return (
          <li key={book.id}>
            <Book book={book} onChangeShelf={onChangeShelf}/>
          </li>
        )
      })}
    </ol>
  )
}

Bookgrid.propTypes = {
  bookList: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default Bookgrid
