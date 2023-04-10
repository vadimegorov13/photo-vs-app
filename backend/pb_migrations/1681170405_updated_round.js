migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i516ul75wdrye2i")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3rzkhmlj",
    "name": "field",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i516ul75wdrye2i")

  // remove
  collection.schema.removeField("3rzkhmlj")

  return dao.saveCollection(collection)
})
