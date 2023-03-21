migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zyb2itwszolx1dp")

  collection.name = "userTournament"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zyb2itwszolx1dp")

  collection.name = "registeredUser"

  return dao.saveCollection(collection)
})
