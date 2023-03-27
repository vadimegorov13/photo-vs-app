migrate((db) => {
  const collection = new Collection({
    "id": "itoc7hs6x2i4e1v",
    "created": "2023-03-27 23:11:00.479Z",
    "updated": "2023-03-27 23:11:00.479Z",
    "name": "userVote",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ejgkgfqg",
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
  const collection = dao.findCollectionByNameOrId("itoc7hs6x2i4e1v");

  return dao.deleteCollection(collection);
})
