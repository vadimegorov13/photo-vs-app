migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j683w9bodvohn1x")

  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j683w9bodvohn1x")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
