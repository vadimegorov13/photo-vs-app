migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lc0uwiv4imoemea")

  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lc0uwiv4imoemea")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
