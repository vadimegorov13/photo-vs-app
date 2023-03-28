migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x3cin2n5dmugemj")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xafsqlu4",
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
  const collection = dao.findCollectionByNameOrId("x3cin2n5dmugemj")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xafsqlu4",
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
