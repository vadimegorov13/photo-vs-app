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
      "cascadeDelete": false,
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
      "cascadeDelete": false,
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
    "id": "3nqkbv7l",
    "name": "submission1",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "m1el6ib6mvsyylo",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "title",
        "imageUrl",
        "user"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o7599ixg",
    "name": "submission2",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "m1el6ib6mvsyylo",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "title",
        "imageUrl",
        "user"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4ziotdho",
    "name": "winner",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "m1el6ib6mvsyylo",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3nqkbv7l",
    "name": "submission1",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "m1el6ib6mvsyylo",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "title",
        "imageUrl",
        "user"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o7599ixg",
    "name": "submission2",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "m1el6ib6mvsyylo",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "title",
        "imageUrl",
        "user"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4ziotdho",
    "name": "winner",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "m1el6ib6mvsyylo",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
