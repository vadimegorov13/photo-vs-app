migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x3cin2n5dmugemj")

  // remove
  collection.schema.removeField("hiceble2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xafsqlu4",
    "name": "tournament",
    "type": "relation",
    "required": false,
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
    "id": "yfsljxme",
    "name": "rounds",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "i516ul75wdrye2i",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cq3xac7j",
    "name": "currentRound",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "i516ul75wdrye2i",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sk4atswj",
    "name": "tournamentState",
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
    "id": "ug0lvmb5",
    "name": "matchState",
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
    "id": "qr4ionwe",
    "name": "roundState",
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
    "id": "vjpqw6sc",
    "name": "bracket",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x3cin2n5dmugemj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hiceble2",
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
  collection.schema.removeField("xafsqlu4")

  // remove
  collection.schema.removeField("yfsljxme")

  // remove
  collection.schema.removeField("cq3xac7j")

  // remove
  collection.schema.removeField("sk4atswj")

  // remove
  collection.schema.removeField("ug0lvmb5")

  // remove
  collection.schema.removeField("qr4ionwe")

  // remove
  collection.schema.removeField("vjpqw6sc")

  return dao.saveCollection(collection)
})
