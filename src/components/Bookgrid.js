import React, { Component }from 'react'
import Book from './Book.js'

class Bookgrid extends Component {
  state = {
    books: [1, 2]
  }

  render() {
    return (
      <ol className="books-grid">
        {this.state.books.map((book) => {
          <li>
            <Book />
          </li>
        })}
      </ol>
    )
  }
}
export default Bookgrid
