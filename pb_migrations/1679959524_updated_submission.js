migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j683w9bodvohn1x")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3juoxuv0",
    "name": "userTournament",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "lc0uwiv4imoemea",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j683w9bodvohn1x")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3juoxuv0",
    "name": "userTournament",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "lc0uwiv4imoemea",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
