migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z6sax31e",
    "name": "tournaments",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "zyb2itwszolx1dp",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z6sax31e",
    "name": "tournaments",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "zyb2itwszolx1dp",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
