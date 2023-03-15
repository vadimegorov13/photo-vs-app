migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1lgzwn0loe44m3g")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0edjohkk",
    "name": "submission",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "m1el6ib6mvsyylo",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1lgzwn0loe44m3g")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0edjohkk",
    "name": "submission",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "m1el6ib6mvsyylo",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "userId"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
