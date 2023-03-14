migrate((db) => {
  const collection = new Collection({
    "id": "mv6kwy9uja06py0",
    "created": "2023-03-14 16:57:12.408Z",
    "updated": "2023-03-14 16:57:12.408Z",
    "name": "tournament",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6xy60llf",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 3,
          "max": 64,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "swi6p3qr",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 3,
          "max": 256,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "v6qx7f2s",
        "name": "maxPlayers",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": 32
        }
      },
      {
        "system": false,
        "id": "lvn82ary",
        "name": "maxSubmissions",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 32
        }
      },
      {
        "system": false,
        "id": "s5kr5up6",
        "name": "organizerId",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "acvdzkrl",
        "name": "registeredUsers",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": 1,
          "maxSelect": 32,
          "displayFields": [
            "id",
            "username",
            "avatar"
          ]
        }
      },
      {
        "system": false,
        "id": "95hatxqw",
        "name": "status",
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
  const collection = dao.findCollectionByNameOrId("mv6kwy9uja06py0");

  return dao.deleteCollection(collection);
})
