migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m7crr6xhbpmojf9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ywvt5ehh",
    "name": "host",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ztcbd3kg",
    "name": "settings",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "rskv7q54y81wtih",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0cbamo3t",
    "name": "state",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "x3cin2n5dmugemj",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m7crr6xhbpmojf9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ywvt5ehh",
    "name": "host",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ztcbd3kg",
    "name": "settings",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "rskv7q54y81wtih",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0cbamo3t",
    "name": "state",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "x3cin2n5dmugemj",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
