migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mv6kwy9uja06py0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gqdk87yj",
    "name": "registeredUsers",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "zyb2itwszolx1dp",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "id",
        "ready"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mv6kwy9uja06py0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gqdk87yj",
    "name": "registeredUsers",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "zyb2itwszolx1dp",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "id",
        "ready"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
