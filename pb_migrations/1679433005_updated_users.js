migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("qelv2pux")

  // remove
  collection.schema.removeField("ra8rbbrk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "imoilwcf",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z6sax31e",
    "name": "tournaments",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "zyb2itwszolx1dp",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qelv2pux",
    "name": "tournaments",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "mv6kwy9uja06py0",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "id",
        "title",
        "description",
        "maxPlayers",
        "maxSubmissions",
        "status",
        "joinCode"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ra8rbbrk",
    "name": "submissions",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "m1el6ib6mvsyylo",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("imoilwcf")

  // remove
  collection.schema.removeField("z6sax31e")

  return dao.saveCollection(collection)
})
