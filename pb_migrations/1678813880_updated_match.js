migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qyj3kqt1b0x109b")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pvo8emdn",
    "name": "votes1",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vrwiidfp",
    "name": "votes2",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  // add
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

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qyj3kqt1b0x109b")

  // remove
  collection.schema.removeField("pvo8emdn")

  // remove
  collection.schema.removeField("vrwiidfp")

  // remove
  collection.schema.removeField("sdqidrix")

  // remove
  collection.schema.removeField("fsx80nx1")

  return dao.saveCollection(collection)
})
