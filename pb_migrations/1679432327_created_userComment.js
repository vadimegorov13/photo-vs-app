migrate((db) => {
  const collection = new Collection({
    "id": "99n65t22sadljcc",
    "created": "2023-03-21 20:58:47.720Z",
    "updated": "2023-03-21 20:58:47.720Z",
    "name": "userComment",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "w4g4x2mf",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "id",
            "username",
            "email"
          ]
        }
      },
      {
        "system": false,
        "id": "qtcn8hs2",
        "name": "comment",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 256,
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
  const collection = dao.findCollectionByNameOrId("99n65t22sadljcc");

  return dao.deleteCollection(collection);
})
