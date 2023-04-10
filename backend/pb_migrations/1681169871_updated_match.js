migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kp26rxbef1yalup")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yfpkgyay",
    "name": "oy",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kp26rxbef1yalup")

  // remove
  collection.schema.removeField("yfpkgyay")

  return dao.saveCollection(collection)
})
