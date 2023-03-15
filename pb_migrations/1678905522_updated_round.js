migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qs899ixnfdlhkos")

  // remove
  collection.schema.removeField("lv6qskbe")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qs899ixnfdlhkos")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lv6qskbe",
    "name": "tournamentId",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
