import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Searchbar from './Searchbar.js'
import Shelf from './Shelf.js'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route path="/main" component={Shelf}/>
        <Route path="/search" component={Searchbar} />
      </div>
    )
  }
}

export default BooksApp
