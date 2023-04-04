migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rskv7q54y81wtih")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yfql4bj2",
    "name": "auto",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rskv7q54y81wtih")

  // update
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
})
