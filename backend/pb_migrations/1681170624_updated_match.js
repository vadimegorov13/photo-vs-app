migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kp26rxbef1yalup")

  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kp26rxbef1yalup")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
