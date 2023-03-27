migrate((db) => {
  const collection = new Collection({
    "id": "lc0uwiv4imoemea",
    "created": "2023-03-27 23:07:10.733Z",
    "updated": "2023-03-27 23:07:10.733Z",
    "name": "userTournament",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wc5c3kjs",
        "name": "user",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("lc0uwiv4imoemea");

  return dao.deleteCollection(collection);
})
