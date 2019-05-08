function makeBookmarksArray() {
  return [
    {
      title: "Google",
      rating: 5,
      url: "http://google.com",
      description: "The best search engine ever.",
      id: 1,
    },
    {
      id: 2,
      title: "IMDB",
      url: "http://imdb.com",
      rating: 5,
      description: "The best movie search engine ever.",

    },
    {
      title: "Facebook",
      rating: 5,
      url: "http://facebook.com",
      description: "The best time sink ever.",
      id: 3,
    }
  ]
}

module.exports = makeBookmarksArray