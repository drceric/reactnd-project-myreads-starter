import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Searchbar from './Searchbar.js'
import Shelf from './Shelf.js'
import * as BooksAPI from '../utils/BooksAPI'
class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books => {
      this.setState({ books: books })
    }))
  }

  onChangeShelf = (book, shelf) => {
    book.shelf = shelf
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then( books => {
        this.setState({ books: books })
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={({ history }) => (
          <Shelf
            books={this.state.books}
            onChangeShelf={this.onChangeShelf}
          />
        )}/>
        <Route path="/search" render={({ history }) => (
          <Searchbar
            books={this.state.books}
            onChangeShelf={this.onChangeShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
