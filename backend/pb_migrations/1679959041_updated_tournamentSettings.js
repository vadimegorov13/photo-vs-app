migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rskv7q54y81wtih")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ktypuap7",
    "name": "maxPlayers",
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
    "id": "jhg3rb3q",
    "name": "maxSubmissions",
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
    "id": "yjpcirej",
    "name": "voteTime",
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
    "id": "huophlct",
    "name": "type",
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
    "id": "yfql4bj2",
    "name": "auto",
    "type": "bool",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rskv7q54y81wtih")

  // remove
  collection.schema.removeField("ktypuap7")

  // remove
  collection.schema.removeField("jhg3rb3q")

  // remove
  collection.schema.removeField("yjpcirej")

  // remove
  collection.schema.removeField("huophlct")

  // remove
  collection.schema.removeField("yfql4bj2")

  return dao.saveCollection(collection)
})
