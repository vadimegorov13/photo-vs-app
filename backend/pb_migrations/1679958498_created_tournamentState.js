migrate((db) => {
  const collection = new Collection({
    "id": "x3cin2n5dmugemj",
    "created": "2023-03-27 23:08:18.441Z",
    "updated": "2023-03-27 23:08:18.441Z",
    "name": "tournamentState",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hiceble2",
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
  const collection = dao.findCollectionByNameOrId("x3cin2n5dmugemj");

  return dao.deleteCollection(collection);
})
