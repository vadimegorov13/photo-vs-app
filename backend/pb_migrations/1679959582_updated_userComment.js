migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6elt0g070cf7c5d")

  // remove
  collection.schema.removeField("cbkna4sk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o5fgmlcs",
    "name": "author",
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
    "id": "79nf1zxe",
    "name": "text",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gg1mp5d5",
    "name": "submission",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "j683w9bodvohn1x",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6elt0g070cf7c5d")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cbkna4sk",
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
  collection.schema.removeField("o5fgmlcs")

  // remove
  collection.schema.removeField("79nf1zxe")

  // remove
  collection.schema.removeField("gg1mp5d5")

  return dao.saveCollection(collection)
})
