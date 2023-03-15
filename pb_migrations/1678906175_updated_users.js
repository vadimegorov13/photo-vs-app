migrate((db) => {
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
      "displayFields": []
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vp4lqjdy",
    "name": "votes",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "1lgzwn0loe44m3g",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("qelv2pux")

  // remove
  collection.schema.removeField("ra8rbbrk")

  // remove
  collection.schema.removeField("vp4lqjdy")

  return dao.saveCollection(collection)
})
