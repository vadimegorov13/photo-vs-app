migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mv6kwy9uja06py0")

  // remove
  collection.schema.removeField("o7l4dvgf")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mv6kwy9uja06py0")

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

  return dao.saveCollection(collection)
})
