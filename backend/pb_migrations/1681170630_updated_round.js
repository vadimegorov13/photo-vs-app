migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i516ul75wdrye2i")

  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i516ul75wdrye2i")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
