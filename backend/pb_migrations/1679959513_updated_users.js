migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cblqrbp4",
    "name": "tournaments",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "lc0uwiv4imoemea",
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

  // remove
  collection.schema.removeField("cblqrbp4")

  return dao.saveCollection(collection)
})
