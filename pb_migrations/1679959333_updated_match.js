migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kp26rxbef1yalup")

  // remove
  collection.schema.removeField("0rhbai4n")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1ftohtps",
    "name": "round",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "i516ul75wdrye2i",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nmnqiz1x",
    "name": "submission1",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "j683w9bodvohn1x",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gunnc5mg",
    "name": "submission2",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "j683w9bodvohn1x",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
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

  // add
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xlrsk3yo",
    "name": "winner",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "j683w9bodvohn1x",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kp26rxbef1yalup")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0rhbai4n",
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

  // remove
  collection.schema.removeField("1ftohtps")

  // remove
  collection.schema.removeField("nmnqiz1x")

  // remove
  collection.schema.removeField("gunnc5mg")

  // remove
  collection.schema.removeField("jglahygc")

  // remove
  collection.schema.removeField("r2wlczuj")

  // remove
  collection.schema.removeField("xlrsk3yo")

  return dao.saveCollection(collection)
})
