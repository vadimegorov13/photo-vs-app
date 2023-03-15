migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qyj3kqt1b0x109b")

  // remove
  collection.schema.removeField("pvo8emdn")

  // remove
  collection.schema.removeField("vrwiidfp")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qyj3kqt1b0x109b")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pvo8emdn",
    "name": "votes1",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vrwiidfp",
    "name": "votes2",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
