migrate((db) => {
  const collection = new Collection({
    "id": "m1el6ib6mvsyylo",
    "created": "2023-03-14 17:04:30.200Z",
    "updated": "2023-03-14 17:04:30.200Z",
    "name": "submission",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vcr4prnm",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 3,
          "max": 64,
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
  const collection = dao.findCollectionByNameOrId("m1el6ib6mvsyylo");

  return dao.deleteCollection(collection);
})
