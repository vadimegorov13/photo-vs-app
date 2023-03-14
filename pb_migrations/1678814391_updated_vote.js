migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1lgzwn0loe44m3g")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nenbx0fp",
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
        "title"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1lgzwn0loe44m3g")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nenbx0fp",
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
        "title",
        "status"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
