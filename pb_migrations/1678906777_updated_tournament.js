migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mv6kwy9uja06py0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jbsxraay",
    "name": "organizer",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
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
    "id": "jbsxraay",
    "name": "organizer",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
