migrate((db) => {
  const collection = new Collection({
    "id": "1lgzwn0loe44m3g",
    "created": "2023-03-14 17:04:48.913Z",
    "updated": "2023-03-14 17:04:48.913Z",
    "name": "vote",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "1hsdzgvp",
        "name": "userId",
        "type": "text",
        "required": true,
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
  const collection = dao.findCollectionByNameOrId("1lgzwn0loe44m3g");

  return dao.deleteCollection(collection);
})
