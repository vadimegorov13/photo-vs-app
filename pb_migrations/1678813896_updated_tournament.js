migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mv6kwy9uja06py0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "acvdzkrl",
    "name": "registeredUsers",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "id",
        "username",
        "avatar"
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
    "id": "acvdzkrl",
    "name": "registeredUsers",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": 1,
      "maxSelect": 32,
      "displayFields": [
        "id",
        "username",
        "avatar"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
