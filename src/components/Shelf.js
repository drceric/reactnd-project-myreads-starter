import React from 'react'
import { Link } from 'react-router-dom'
import Bookgrid from './Bookgrid.js'
import * as BooksAPI from '../utils/BooksAPI'

const shelves = ["Currently Reading", "Want to Read", "Read"]
const shelfToKey = {
  "Currently Reading": "currentlyReading",
  "Want to Read": 'wantToRead',
  "Read": "read"
}

class Shelf extends React.Component {
  state = {
    read: [],
    currentlyReading: [],
    wantToRead: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books => {
      let read = books.filter(book => book.shelf === 'read')
      let current = books.filter(book => book.shelf === 'currentlyReading')
      let want = books.filter(book => book.shelf === 'wantToRead')
      this.setState({read : read, currentlyReading: current, wantToRead: want})
    }))
  }

  onChangeShelf = (book, shelf) => {
    this.setState((prevState) => {
      prevState[book.shelf] = prevState[book.shelf].filter(b => b.id !== book.id)
      book.shelf = shelf
      if (shelf !== 'none'){
        prevState[shelf].push(book)
      }
      return prevState
    })
    BooksAPI.update(book, shelf)
  }

  render () {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          {shelves.map((categ) => {
            return (
              <div className="bookshelf"
                    key={categ}>
                <h2 className="bookshelf-title">{categ}</h2>
                <div className="bookshelf-books">
                  <Bookgrid
                    bookList={this.state[shelfToKey[categ]]}
                    onUpdateShelf={this.onChangeShelf}
                  />
                </div>
              </div>
            )
          })}
        </div>
        </div>
        <div className="open-search">
          <Link
            to="/search"
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Shelf
