migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qyj3kqt1b0x109b")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sdqidrix",
    "name": "userVotes1",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "1lgzwn0loe44m3g",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "id"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fsx80nx1",
    "name": "userVotes2",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "1lgzwn0loe44m3g",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "id"
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
    "id": "sdqidrix",
    "name": "userVotes1",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "1lgzwn0loe44m3g",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "id",
        "userId"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fsx80nx1",
    "name": "userVotes2",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "1lgzwn0loe44m3g",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "id",
        "userId"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
