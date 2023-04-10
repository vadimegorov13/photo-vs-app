migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kp26rxbef1yalup")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jglahygc",
    "name": "userVotes1",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "itoc7hs6x2i4e1v",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r2wlczuj",
    "name": "userVotes2",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "itoc7hs6x2i4e1v",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kp26rxbef1yalup")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jglahygc",
    "name": "userVotes1",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "itoc7hs6x2i4e1v",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r2wlczuj",
    "name": "userVotes2",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "itoc7hs6x2i4e1v",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
