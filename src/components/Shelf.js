import React from 'react'
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
    this.setState((state) => {
      state[book.shelf] = state[book.shelf].filter(b => b.id !== book.id)
      state[shelf].push(book)
    })
    BooksAPI.update(book, shelf)
  }

  render () {
    const { onChangeView, page } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          {shelves.map((categ) => {
            return (
              <div className="bookshelf">
                <h2 className="bookshelf-title">{categ}</h2>
                <div className="bookshelf-books">
                  <Bookgrid
                    key={categ}
                    bookList={this.state[shelfToKey[categ]]}
                    onChangeShelf={this.onChangeShelf}
                  />
                </div>
              </div>
            )
          })}
        </div>
        </div>
        <div className="open-search">
          <a onClick={() => onChangeView()}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default Shelf
