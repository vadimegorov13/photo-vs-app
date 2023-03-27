migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i516ul75wdrye2i")

  // remove
  collection.schema.removeField("jdtyyun4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cwvkjog8",
    "name": "tournament",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "m7crr6xhbpmojf9",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lfxtizvo",
    "name": "matches",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "kp26rxbef1yalup",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9fuz5nt9",
    "name": "currentMatch",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "kp26rxbef1yalup",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i516ul75wdrye2i")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jdtyyun4",
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

  // remove
  collection.schema.removeField("cwvkjog8")

  // remove
  collection.schema.removeField("lfxtizvo")

  // remove
  collection.schema.removeField("9fuz5nt9")

  return dao.saveCollection(collection)
})
