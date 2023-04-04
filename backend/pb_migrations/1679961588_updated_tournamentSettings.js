migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rskv7q54y81wtih")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jp5c2ys6",
    "name": "tournament",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "m7crr6xhbpmojf9",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rskv7q54y81wtih")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jp5c2ys6",
    "name": "tournament",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "m7crr6xhbpmojf9",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
