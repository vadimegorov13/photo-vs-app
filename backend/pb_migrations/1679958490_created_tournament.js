migrate((db) => {
  const collection = new Collection({
    "id": "m7crr6xhbpmojf9",
    "created": "2023-03-27 23:08:10.535Z",
    "updated": "2023-03-27 23:08:10.535Z",
    "name": "tournament",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "glm3jovi",
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
  const collection = dao.findCollectionByNameOrId("m7crr6xhbpmojf9");

  return dao.deleteCollection(collection);
})
