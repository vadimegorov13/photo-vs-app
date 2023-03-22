migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m1el6ib6mvsyylo")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rxwuvko4",
    "name": "image",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/vnd.mozilla.apng",
        "image/gif",
        "image/x-xpixmap",
        "image/tiff",
        "image/vnd.adobe.photoshop",
        "image/heif",
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
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/vnd.mozilla.apng",
        "image/gif",
        "image/x-xpixmap",
        "image/tiff",
        "image/vnd.adobe.photoshop",
        "image/heif"
      ],
      "thumbs": [
        "480x720"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
