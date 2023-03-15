migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mv6kwy9uja06py0")

  // remove
  collection.schema.removeField("s5kr5up6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jbsxraay",
    "name": "organizer",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mv6kwy9uja06py0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s5kr5up6",
    "name": "organizerId",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("jbsxraay")

  return dao.saveCollection(collection)
})
