migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x3cin2n5dmugemj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "50f3psyf",
    "name": "bracket",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x3cin2n5dmugemj")

  // remove
  collection.schema.removeField("50f3psyf")

  return dao.saveCollection(collection)
})
