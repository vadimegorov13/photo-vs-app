migrate((db) => {
  const collection = new Collection({
    "id": "rskv7q54y81wtih",
    "created": "2023-03-27 23:08:02.081Z",
    "updated": "2023-03-27 23:08:02.081Z",
    "name": "tournamentSettings",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zgsyf57n",
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
  const collection = dao.findCollectionByNameOrId("rskv7q54y81wtih");

  return dao.deleteCollection(collection);
})
