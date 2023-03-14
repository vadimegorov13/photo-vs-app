migrate((db) => {
  const collection = new Collection({
    "id": "qyj3kqt1b0x109b",
    "created": "2023-03-14 17:04:04.218Z",
    "updated": "2023-03-14 17:04:04.218Z",
    "name": "match",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dkmznz5k",
        "name": "roundId",
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
        "id": "a1c99sox",
        "name": "round",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "qs899ixnfdlhkos",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "id",
            "order",
            "tournamentId",
            "status"
          ]
        }
      },
      {
        "system": false,
        "id": "asvluii3",
        "name": "userId1",
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
        "id": "tzphyf2s",
        "name": "user1",
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
            "avatar"
          ]
        }
      },
      {
        "system": false,
        "id": "rv0hegw0",
        "name": "userId2",
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
        "id": "bkmo9ys5",
        "name": "user2",
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
            "avatar"
          ]
        }
      },
      {
        "system": false,
        "id": "0uw0cl7l",
        "name": "winnerId",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "8d3g2yn4",
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
  const collection = dao.findCollectionByNameOrId("qyj3kqt1b0x109b");

  return dao.deleteCollection(collection);
})
