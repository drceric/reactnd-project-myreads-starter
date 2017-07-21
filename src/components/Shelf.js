import React from 'react'
import Book from './Book.js'
import Bookgrid from './Bookgrid.js'

const shelves = ["Currently Reading", "Want to Read", "Read"]

let initInfo = {}
initInfo["current"] = ["To Kill a Mockingbird", "Harper Lee"], ["Ender's Game", "Orson Scott Card"]
initInfo["want"] = [["1776", "David McCullough"], ["Harry Potter and the Sorcerer's Stone", "J.K. Rowling"]]
initInfo["read"] = [["The Hobbit", "J.R.R. Tolkien"], ["Oh, the Places You'll Go!", "Seuss"], ["The Adventures of Tom Sawyer", "Mark Twain"]]

class Shelf extends React.Component {

  render () {
    return (
      <div>
      {shelves.map((categ) => {
        <div className="bookshelf">
          <h2 className="bookshelf-title">{categ}</h2>
          <div className="bookshelf-books">
            <Bookgrid />
          </div>
        </div>
      })}
    </div>
    )
  }
}

export default Shelf
