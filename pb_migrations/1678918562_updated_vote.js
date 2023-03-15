migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1lgzwn0loe44m3g")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zfduud0i",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
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
  const collection = dao.findCollectionByNameOrId("1lgzwn0loe44m3g")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zfduud0i",
    "name": "user",
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
})
