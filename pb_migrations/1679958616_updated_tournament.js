migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m7crr6xhbpmojf9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uinrwyux",
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
    "id": "kwvysfg4",
    "name": "joinCode",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x9v3j2iu",
    "name": "registeredUsers",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "lc0uwiv4imoemea",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // add
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

  // add
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "glm3jovi",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m7crr6xhbpmojf9")

  // remove
  collection.schema.removeField("uinrwyux")

  // remove
  collection.schema.removeField("kwvysfg4")

  // remove
  collection.schema.removeField("ywvt5ehh")

  // remove
  collection.schema.removeField("x9v3j2iu")

  // remove
  collection.schema.removeField("ztcbd3kg")

  // remove
  collection.schema.removeField("0cbamo3t")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "glm3jovi",
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

  return dao.saveCollection(collection)
})
