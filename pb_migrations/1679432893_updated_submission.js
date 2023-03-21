migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m1el6ib6mvsyylo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rn1blsh1",
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
        "email"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m1el6ib6mvsyylo")

  // remove
  collection.schema.removeField("rn1blsh1")

  return dao.saveCollection(collection)
})
