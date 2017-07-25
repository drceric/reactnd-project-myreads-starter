import React from 'react'
import Bookgrid from './Bookgrid.js'

const shelves = ["Currently Reading", "Want to Read", "Read"]

class Shelf extends React.Component {
  /**
  read, wantToRead
  */
  render () {
    const { onChangeView, page, userBooks} = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          {shelves.map((categ) => {
            <div className="bookshelf">
              <h2 className="bookshelf-title">{categ}</h2>
              <Bookgrid
                bookList={userBooks}
              />
            </div>
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
