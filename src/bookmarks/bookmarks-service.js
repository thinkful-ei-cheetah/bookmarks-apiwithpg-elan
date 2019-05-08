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
  },
  insertBookmark(knex, newBookmark) {
    return knex
      .into('bookmarks')
      .insert(newBookmark)
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  deleteBookmark(knex, id) {
    return knex('bookmarks')
      .where('id', id)
      .del()
  }
}

module.exports = BookmarksService