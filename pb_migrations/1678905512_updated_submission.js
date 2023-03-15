migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m1el6ib6mvsyylo")

  // remove
  collection.schema.removeField("szsm1v6g")

  // remove
  collection.schema.removeField("mbfylxhc")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m1el6ib6mvsyylo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "szsm1v6g",
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
    "id": "mbfylxhc",
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

  return dao.saveCollection(collection)
})
