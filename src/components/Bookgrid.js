import React, { Component }from 'react'

class Book extends Component {
  render() {
    const { book, shelf, onChangeShelf } = this.props
    if (!book.hasOwnProperty("authors")) {
      book.authors = []
    }
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={shelf}
                    onChange={e => {onChangeShelf(book, e.target.value)}}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {
          book.authors.map((author) => {
            return (
              <div className="book-authors" key={author}>{author}</div>
            )
          })
        }
      </div>
    )
  }
}

class Bookgrid extends Component {
  render() {
    const { bookList, onChangeShelf } = this.props
    return (
      <ol className="books-grid">
        {bookList.map((book) => {
          return (
            <li key={book.shelf+book.id}>
              <Book
                book={book}
                shelf={book.shelf}
                onChangeShelf={onChangeShelf}
              />
            </li>
          )
        })}
      </ol>
    )
  }
}

export default Bookgrid
