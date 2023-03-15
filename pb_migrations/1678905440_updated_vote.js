migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1lgzwn0loe44m3g")

  // remove
  collection.schema.removeField("1hsdzgvp")

  // remove
  collection.schema.removeField("wnr4utw9")

  // remove
  collection.schema.removeField("nofmswqq")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1lgzwn0loe44m3g")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1hsdzgvp",
    "name": "userId",
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

  return dao.saveCollection(collection)
})
