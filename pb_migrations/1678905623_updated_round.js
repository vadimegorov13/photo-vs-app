migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qs899ixnfdlhkos")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jye9zhs5",
    "name": "matches",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "qyj3kqt1b0x109b",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "id",
        "submission1",
        "submission2"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qs899ixnfdlhkos")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jye9zhs5",
    "name": "matches",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "qyj3kqt1b0x109b",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "id",
        "userId1",
        "userId2",
        "submission1",
        "submission2"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
