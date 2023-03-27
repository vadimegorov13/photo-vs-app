migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j683w9bodvohn1x")

  // remove
  collection.schema.removeField("oodr8wog")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3juoxuv0",
    "name": "userTournament",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "lc0uwiv4imoemea",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p8qdxwgg",
    "name": "title",
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
    "id": "nr0nk1x6",
    "name": "description",
    "type": "text",
    "required": false,
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
    "id": "k9rakpxa",
    "name": "image",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d0pxwgbl",
    "name": "comments",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "6elt0g070cf7c5d",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j683w9bodvohn1x")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oodr8wog",
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
  collection.schema.removeField("3juoxuv0")

  // remove
  collection.schema.removeField("p8qdxwgg")

  // remove
  collection.schema.removeField("nr0nk1x6")

  // remove
  collection.schema.removeField("k9rakpxa")

  // remove
  collection.schema.removeField("d0pxwgbl")

  return dao.saveCollection(collection)
})
