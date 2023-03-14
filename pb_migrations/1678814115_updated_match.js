migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qyj3kqt1b0x109b")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hu6kahms",
    "name": "submissionId1",
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
    "id": "he30546h",
    "name": "submissionId2",
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
    "id": "3nqkbv7l",
    "name": "submission1",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "m1el6ib6mvsyylo",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "userId",
        "imageUrl",
        "title"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o7599ixg",
    "name": "submission2",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "m1el6ib6mvsyylo",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "title",
        "userId",
        "imageUrl"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qyj3kqt1b0x109b")

  // remove
  collection.schema.removeField("hu6kahms")

  // remove
  collection.schema.removeField("he30546h")

  // remove
  collection.schema.removeField("3nqkbv7l")

  // remove
  collection.schema.removeField("o7599ixg")

  return dao.saveCollection(collection)
})
