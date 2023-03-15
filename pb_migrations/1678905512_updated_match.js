migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qyj3kqt1b0x109b")

  // update
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
        "title"
      ]
    }
  }))

  // update
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
        "title"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qyj3kqt1b0x109b")

  // update
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
        "title"
      ]
    }
  }))

  // update
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
        "userId"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
