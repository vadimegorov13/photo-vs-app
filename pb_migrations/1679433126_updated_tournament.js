migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mv6kwy9uja06py0")

  // remove
  collection.schema.removeField("acvdzkrl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gqdk87yj",
    "name": "registeredUsers",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "zyb2itwszolx1dp",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "id",
        "ready"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jbsxraay",
    "name": "host",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "username",
        "avatar"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mv6kwy9uja06py0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "acvdzkrl",
    "name": "registeredUsers",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "id",
        "username",
        "avatar"
      ]
    }
  }))

  // remove
  collection.schema.removeField("gqdk87yj")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jbsxraay",
    "name": "organizer",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "username",
        "avatar"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
