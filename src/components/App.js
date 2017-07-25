import React from 'react'
import * as BooksAPI from '../utils/BooksAPI'
import './App.css'
import Searchbar from './Searchbar.js'
import Shelf from './Shelf.js'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    userBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books => {
      this.setState({userBooks : books})
    }))
  }

  onClickChangeView = () => {
    this.setState({ showSearchPage: !this.state.showSearchPage })
  }

  render() {
    console.log(this.state)
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Searchbar
            onChangeView={this.onClickChangeView}
            page={this.state.showSearchPage}
            books={this.state.books}
          />
        ) : (
          <Shelf
            onChangeView={this.onClickChangeView}
            page={this.state.showSearchPage}
            userBooks={this.state.userBooks}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
