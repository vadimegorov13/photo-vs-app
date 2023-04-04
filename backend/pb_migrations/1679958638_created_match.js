migrate((db) => {
  const collection = new Collection({
    "id": "kp26rxbef1yalup",
    "created": "2023-03-27 23:10:38.162Z",
    "updated": "2023-03-27 23:10:38.162Z",
    "name": "match",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0rhbai4n",
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
  const collection = dao.findCollectionByNameOrId("kp26rxbef1yalup");

  return dao.deleteCollection(collection);
})
