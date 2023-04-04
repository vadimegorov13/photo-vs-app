migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m7crr6xhbpmojf9")

  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m7crr6xhbpmojf9")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
