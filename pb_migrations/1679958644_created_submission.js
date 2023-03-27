migrate((db) => {
  const collection = new Collection({
    "id": "j683w9bodvohn1x",
    "created": "2023-03-27 23:10:44.729Z",
    "updated": "2023-03-27 23:10:44.729Z",
    "name": "submission",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "oodr8wog",
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
  const collection = dao.findCollectionByNameOrId("j683w9bodvohn1x");

  return dao.deleteCollection(collection);
})
