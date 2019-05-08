const BookmarksService = {
  getAllBookmarks(knex) {
    return knex('bookmarks')
      .select('*')
  },
  getBookmarkById(knex, id) {
    return knex('bookmarks')
      .select('*')
      .where('id', id)
      .first()
  },
  updateBookmark(knex, id, updatedBookmark) {
    return knex('bookmarks')
      .select('*')
      .where('id', id)
      .update(updatedBookmark)
  }
}

module.exports = BookmarksService