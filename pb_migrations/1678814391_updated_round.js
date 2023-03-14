migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qs899ixnfdlhkos")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yg8ucyrn",
    "name": "tournament",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "mv6kwy9uja06py0",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "description",
        "title"
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
    "id": "yg8ucyrn",
    "name": "tournament",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "mv6kwy9uja06py0",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "description",
        "status",
        "title"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
