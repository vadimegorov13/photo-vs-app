migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qelv2pux",
    "name": "tournaments",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "mv6kwy9uja06py0",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "id",
        "title",
        "description",
        "maxPlayers",
        "maxSubmissions",
        "status",
        "joinCode"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qelv2pux",
    "name": "tournaments",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "mv6kwy9uja06py0",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
