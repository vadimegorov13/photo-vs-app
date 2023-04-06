migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i516ul75wdrye2i")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bh7tf9r3",
    "name": "nextRound",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "i516ul75wdrye2i",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i516ul75wdrye2i")

  // remove
  collection.schema.removeField("bh7tf9r3")

  return dao.saveCollection(collection)
})
