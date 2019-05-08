const express = require('express');
const uuid = require('uuid/v4');
const logger = require('../logger');
const bookmarksRouter = express.Router();
const BookmarksService = require('../bookmarks-service')

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
  .post(bodyParser, (req, res) => {
    const { title, rating, url, description } = req.body;
    const parsedRating = parseInt(rating);

    if(!title) {
      logger.error('Title is required')
      return res
        .status(400)
        .send('Invalid Data');
    }
    if(!rating) {
      logger.error('Rating is required')
      return res
        .status(400)
        .send('Invalid Data');
    }
    if(!url) {
      logger.error('Url is required')
      return res
        .status(400)
        .send('Invalid Data');
    }
    if(!description) {
      logger.error('Description is required')
      return res
        .status(400)
        .send('Invalid Data');
    }
    const id = uuid();

    const bookmark = {
      title,
      rating: parsedRating,
      url,
      description,
      id
    }
    bookmarks.push(bookmark);

    logger.info(`List with id ${id} created`);

    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${id}`)
      .json({id});
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
    .delete((req, res) => {
      const { id } = req.params;
      const index = bookmarks.findIndex(bm => bm.id == id);

      if(index === -1) {
        logger.error(`List with id ${id} not found.`);
        return res
          .status(404)
          .send('Not Found');
      }

      bookmarks.splice(index, 1);

      logger.info(`List with id ${id} deleted.`);
      res
        .status(204)
        .end();
    })

module.exports = bookmarksRouter;
  