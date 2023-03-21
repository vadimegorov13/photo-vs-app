migrate((db) => {
  const collection = new Collection({
    "id": "zyb2itwszolx1dp",
    "created": "2023-03-21 20:56:21.332Z",
    "updated": "2023-03-21 20:56:21.332Z",
    "name": "registeredUser",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qwkzu6eu",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "id",
            "username",
            "email",
            "avatar"
          ]
        }
      },
      {
        "system": false,
        "id": "drgq9qa1",
        "name": "tournament",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "mv6kwy9uja06py0",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "id",
            "title",
            "description"
          ]
        }
      },
      {
        "system": false,
        "id": "5n3c94ws",
        "name": "submissions",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "m1el6ib6mvsyylo",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "3cwyrvpg",
        "name": "ready",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("zyb2itwszolx1dp");

  return dao.deleteCollection(collection);
})
