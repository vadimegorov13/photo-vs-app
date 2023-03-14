migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qs899ixnfdlhkos")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jye9zhs5",
    "name": "matches",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "qyj3kqt1b0x109b",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "id",
        "userId1",
        "userId2"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qs899ixnfdlhkos")

  // remove
  collection.schema.removeField("jye9zhs5")

  return dao.saveCollection(collection)
})
