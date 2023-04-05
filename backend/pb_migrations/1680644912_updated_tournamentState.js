migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x3cin2n5dmugemj")

  // remove
  collection.schema.removeField("vjpqw6sc")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x3cin2n5dmugemj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vjpqw6sc",
    "name": "bracket",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
