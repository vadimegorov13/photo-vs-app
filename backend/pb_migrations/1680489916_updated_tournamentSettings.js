migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rskv7q54y81wtih")

  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rskv7q54y81wtih")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
