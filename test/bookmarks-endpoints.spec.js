require('dotenv').config()
const knex = require('knex')
const app = require('../src/app')
const MakeBookmarksArray = require('./bookmarks.fixtures') 

describe(`Bookmarks Endpoins`, () => {
  let db

  before(() => {
    console.log(process.env.TEST_DB_URL)
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
    app.set('db', db)
  })

  before('clean the table', () => db('bookmarks').truncate())
  
  afterEach('clean the table', () => db('bookmarks').truncate())

  after('destroy the database', () => db.destroy())

  describe('GET /bookmarks', () => {
    context(`Given no bookmarks are in the db`, () => {
      it(`responds with 200 and an empty array`, () => {  
        return supertest(app)
        .get('/bookmarks')
        .expect(200, [])
      })
    })
  })

  describe('GET /bookmarks', () => {
    context(`Bookmarks do exist in the 'bookmarks' table`, () => {
      const testBookmarks = MakeBookmarksArray()
      beforeEach(() => {
        return db 
          .into('bookmarks')
          .insert(testBookmarks)
      })

      it(`Responds with 200 response and all bookmarks`, () => {
        return supertest(app)
          .get('/bookmarks')
          .expect(200, testBookmarks)
      })
    })
  })

  describe(`GET /bookmarks/:bookmark_id`, () => {
    context(`Given there are bookmarks in the db`, () => {
      const testBookmarks = MakeBookmarksArray()

      beforeEach(`insert bookmarks into 'bookmarks' table`, () => {
        return db
          .into('bookmarks')
          .insert(testBookmarks)
      })

      it(`GET /bookmarks/:bookmark_id responds with bookmark from 'bookmarks' table`, () => {
        const id = 2  
        const expectedBookmark = testBookmarks[id - 1]
        
        return supertest(app)
          .get(`/bookmarks/${id}`)
          .expect(200, expectedBookmark)
      })
    })
    })
  })