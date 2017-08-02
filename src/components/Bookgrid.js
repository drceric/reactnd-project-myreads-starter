import React, { Component }from 'react'

function Bookchanger(props) {
  return (
    <div className="book-shelf-changer">
      <select>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  )
}

class Book extends Component {
  render() {
    const { title, author, image } = this.props
    let url = '"url("' + image + '")"'
    console.log(url)
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+image+')'}}></div>
          <Bookchanger />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{author}</div>
      </div>
    )
  }
}

class Bookgrid extends Component {
  render() {
    const { page, bookList } = this.props
    return (
      <ol className="books-grid">
        {bookList.map((book) => {
          return (
            <li>
              <Book
                title={book.title}
                author={book.authors[0]}
                image={book.imageLinks.thumbnail}
              />
            </li>
          )
        })}
      </ol>
    )
  }
}
export default Bookgrid
