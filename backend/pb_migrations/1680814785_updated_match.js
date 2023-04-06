migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kp26rxbef1yalup")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rrrfdh4t",
    "name": "nextMatch",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "kp26rxbef1yalup",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kp26rxbef1yalup")

  // remove
  collection.schema.removeField("rrrfdh4t")

  return dao.saveCollection(collection)
})
