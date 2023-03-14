migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mv6kwy9uja06py0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qp0g0n2v",
    "name": "joinCode",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": 6,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mv6kwy9uja06py0")

  // remove
  collection.schema.removeField("qp0g0n2v")

  return dao.saveCollection(collection)
})
