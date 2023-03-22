migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zyb2itwszolx1dp")

  collection.deleteRule = "user.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zyb2itwszolx1dp")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
