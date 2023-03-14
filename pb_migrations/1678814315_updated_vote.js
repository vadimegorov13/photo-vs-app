migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1lgzwn0loe44m3g")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wnr4utw9",
    "name": "tournamentId",
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
    "id": "nofmswqq",
    "name": "submissionId",
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
    "id": "zfduud0i",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "username",
        "avatar"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nenbx0fp",
    "name": "tournament",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "mv6kwy9uja06py0",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "title",
        "status"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0edjohkk",
    "name": "submission",
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
        "imageUrl"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1lgzwn0loe44m3g")

  // remove
  collection.schema.removeField("wnr4utw9")

  // remove
  collection.schema.removeField("nofmswqq")

  // remove
  collection.schema.removeField("zfduud0i")

  // remove
  collection.schema.removeField("nenbx0fp")

  // remove
  collection.schema.removeField("0edjohkk")

  return dao.saveCollection(collection)
})
