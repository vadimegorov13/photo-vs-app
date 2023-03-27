migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lc0uwiv4imoemea")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yr9sotll",
    "name": "tournament",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "m7crr6xhbpmojf9",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "shhvoftg",
    "name": "submissions",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "j683w9bodvohn1x",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qkaufshz",
    "name": "ready",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wc5c3kjs",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lc0uwiv4imoemea")

  // remove
  collection.schema.removeField("yr9sotll")

  // remove
  collection.schema.removeField("shhvoftg")

  // remove
  collection.schema.removeField("qkaufshz")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wc5c3kjs",
    "name": "user",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
