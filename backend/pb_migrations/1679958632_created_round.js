migrate((db) => {
  const collection = new Collection({
    "id": "i516ul75wdrye2i",
    "created": "2023-03-27 23:10:32.988Z",
    "updated": "2023-03-27 23:10:32.988Z",
    "name": "round",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jdtyyun4",
        "name": "field",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("i516ul75wdrye2i");

  return dao.deleteCollection(collection);
})
