migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zyb2itwszolx1dp")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5n3c94ws",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zyb2itwszolx1dp")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5n3c94ws",
    "name": "submissions",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "m1el6ib6mvsyylo",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
