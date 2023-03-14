migrate((db) => {
  const collection = new Collection({
    "id": "qs899ixnfdlhkos",
    "created": "2023-03-14 17:00:56.430Z",
    "updated": "2023-03-14 17:00:56.430Z",
    "name": "round",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "djbsssuu",
        "name": "order",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "lv6qskbe",
        "name": "tournamentId",
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
        "id": "yg8ucyrn",
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
            "description",
            "status",
            "title"
          ]
        }
      },
      {
        "system": false,
        "id": "orfwkh0s",
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
  const collection = dao.findCollectionByNameOrId("qs899ixnfdlhkos");

  return dao.deleteCollection(collection);
})
