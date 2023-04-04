migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("itoc7hs6x2i4e1v")

  // remove
  collection.schema.removeField("ejgkgfqg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5etyuvny",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ylsyjfnq",
    "name": "match",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "kp26rxbef1yalup",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("itoc7hs6x2i4e1v")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ejgkgfqg",
    "name": "field",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("5etyuvny")

  // remove
  collection.schema.removeField("ylsyjfnq")

  return dao.saveCollection(collection)
})
