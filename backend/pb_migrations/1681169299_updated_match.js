migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kp26rxbef1yalup")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bjmmb2j7",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kp26rxbef1yalup")

  // remove
  collection.schema.removeField("bjmmb2j7")

  return dao.saveCollection(collection)
})
