migrate((db) => {
  const collection = new Collection({
    "id": "6elt0g070cf7c5d",
    "created": "2023-03-27 23:10:53.065Z",
    "updated": "2023-03-27 23:10:53.065Z",
    "name": "userComment",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cbkna4sk",
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
  const collection = dao.findCollectionByNameOrId("6elt0g070cf7c5d");

  return dao.deleteCollection(collection);
})
