import React from 'react'
import Bookgrid from './Bookgrid.js'

const shelves = ["Currently Reading", "Want to Read", "Read"]

class Shelf extends React.Component {

  bookMatch = (bookList) => {
    let bookDict = {
      "Want to Read": [],
      "Read": [],
      "Currently Reading": []
    }

    bookList.map((book) => {
      if (book.shelf === "wantToRead") {
        bookDict["Want to Read"].push(book)
      } else if (book.shelf === "read") {
        bookDict["Read"].push(book)
      } else {
        bookDict["Currently Reading"].push(book)
      }
    }
    )

    return bookDict
  }

  render () {
    const { onChangeView, page, userBooks} = this.props

    let bookDict = this.bookMatch(userBooks)

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
                    page={page}
                    bookList={bookDict[categ]}
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
