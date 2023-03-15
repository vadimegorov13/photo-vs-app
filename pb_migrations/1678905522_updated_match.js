migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qyj3kqt1b0x109b")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a1c99sox",
    "name": "round",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "qs899ixnfdlhkos",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "order",
        "status"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qyj3kqt1b0x109b")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a1c99sox",
    "name": "round",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "qs899ixnfdlhkos",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "order",
        "tournamentId",
        "status"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
