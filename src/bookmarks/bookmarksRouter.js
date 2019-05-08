const express = require('express');
const uuid = require('uuid/v4');
const logger = require('../logger');
const bookmarksRouter = express.Router();
const BookmarksService = require('./bookmarks-service')

const bodyParser = express.json();

bookmarksRouter
  .route('/bookmarks')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    BookmarksService.getAllBookmarks(knexInstance)
      .then(bookmarks => {
        res.json(bookmarks)
      })
      .catch(next)
  })
  .post(bodyParser, (req, res, next) => {
    const { title, rating, url, description, id } = req.body
    const newBookmark = { title, rating, url, description, id }
    console.log(req.body)
    
    BookmarksService.insertBookmark(req.app.get('db'), newBookmark)
        .then(bookmark => {
          res
            .status(201)
            .location(`/bookmarks/${bookmark.id}`)
            .json(bookmark)
        })
        .catch(next)
  })

  bookmarksRouter
    .route('/bookmarks/:id')
    .get((req, res, next) => {
      const knexInstance = req.app.get('db')
      BookmarksService.getBookmarkById(knexInstance, req.params.id)
        .then(bookmark => {
          if(!bookmark) {
            logger.error(`List with id ${id} not found.`);
            return res
              .status(404)
              .send('List Not Found');
          }
          res.json(bookmark);
        })
        .catch(next)
    })
    .delete((req, res, next) => {
      const { id } = req.params
      BookmarksService.deleteBookmark(req.app.get('db'), id)
        .then(bookmark => {
          return res 
            .status(204)
            .end()
        })
        .catch(next)
    })

module.exports = bookmarksRouter;
  