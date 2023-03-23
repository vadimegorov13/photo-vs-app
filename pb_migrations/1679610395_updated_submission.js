migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m1el6ib6mvsyylo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ymnpwfyc",
    "name": "userTournament",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "zyb2itwszolx1dp",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m1el6ib6mvsyylo")

  // remove
  collection.schema.removeField("ymnpwfyc")

  return dao.saveCollection(collection)
})
