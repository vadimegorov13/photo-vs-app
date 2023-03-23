migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m1el6ib6mvsyylo")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rxwuvko4",
    "name": "image",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/png",
        "image/jpeg",
        "image/svg+xml",
        "image/gif",
        "image/webp"
      ],
      "thumbs": [
        "480x720"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m1el6ib6mvsyylo")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rxwuvko4",
    "name": "image",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [
        "480x720"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
