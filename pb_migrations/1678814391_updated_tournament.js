migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mv6kwy9uja06py0")

  // remove
  collection.schema.removeField("95hatxqw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gsgdvfcz",
    "name": "rounds",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "qs899ixnfdlhkos",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o7l4dvgf",
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
    "id": "ce1n3ero",
    "name": "status",
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
  const collection = dao.findCollectionByNameOrId("mv6kwy9uja06py0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "95hatxqw",
    "name": "status",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("gsgdvfcz")

  // remove
  collection.schema.removeField("o7l4dvgf")

  // remove
  collection.schema.removeField("ce1n3ero")

  return dao.saveCollection(collection)
})
