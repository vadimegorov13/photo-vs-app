migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2023-03-27 23:03:58.725Z",
      "updated": "2023-04-03 02:46:11.227Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
          "name": "name",
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
          "id": "users_avatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif",
              "image/webp"
            ],
            "thumbs": null
          }
        },
        {
          "system": false,
          "id": "cblqrbp4",
          "name": "tournaments",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "lc0uwiv4imoemea",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": []
          }
        }
      ],
      "listRule": "@request.auth.id != \"\"",
      "viewRule": "",
      "createRule": "",
      "updateRule": "id = @request.auth.id",
      "deleteRule": "id = @request.auth.id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "requireEmail": false
      }
    },
    {
      "id": "lc0uwiv4imoemea",
      "created": "2023-03-27 23:07:10.733Z",
      "updated": "2023-04-03 02:45:47.055Z",
      "name": "userTournament",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "wc5c3kjs",
          "name": "user",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "yr9sotll",
          "name": "tournament",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "m7crr6xhbpmojf9",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "shhvoftg",
          "name": "submissions",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "j683w9bodvohn1x",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "qkaufshz",
          "name": "ready",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        }
      ],
      "listRule": "@request.auth.id != \"\"",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\"",
      "updateRule": "@request.auth.id != \"\"",
      "deleteRule": "@request.auth.id != \"\"",
      "options": {}
    },
    {
      "id": "rskv7q54y81wtih",
      "created": "2023-03-27 23:08:02.081Z",
      "updated": "2023-04-03 02:45:16.515Z",
      "name": "tournamentSettings",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "jp5c2ys6",
          "name": "tournament",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "m7crr6xhbpmojf9",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "ktypuap7",
          "name": "maxPlayers",
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
          "id": "jhg3rb3q",
          "name": "maxSubmissions",
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
          "id": "yjpcirej",
          "name": "voteTime",
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
          "id": "huophlct",
          "name": "type",
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
          "id": "yfql4bj2",
          "name": "auto",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        }
      ],
      "listRule": "@request.auth.id != \"\"",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\"",
      "updateRule": "@request.auth.id != \"\"",
      "deleteRule": "@request.auth.id != \"\"",
      "options": {}
    },
    {
      "id": "m7crr6xhbpmojf9",
      "created": "2023-03-27 23:08:10.535Z",
      "updated": "2023-04-03 02:45:06.775Z",
      "name": "tournament",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "glm3jovi",
          "name": "title",
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
          "id": "uinrwyux",
          "name": "description",
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
          "id": "kwvysfg4",
          "name": "joinCode",
          "type": "text",
          "required": true,
          "unique": true,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "ywvt5ehh",
          "name": "host",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "x9v3j2iu",
          "name": "registeredUsers",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "lc0uwiv4imoemea",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "ztcbd3kg",
          "name": "settings",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "rskv7q54y81wtih",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "0cbamo3t",
          "name": "state",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "x3cin2n5dmugemj",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        }
      ],
      "listRule": "@request.auth.id != \"\"",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\"",
      "updateRule": "@request.auth.id != \"\"",
      "deleteRule": "@request.auth.id != \"\"",
      "options": {}
    },
    {
      "id": "x3cin2n5dmugemj",
      "created": "2023-03-27 23:08:18.441Z",
      "updated": "2023-04-06 19:56:56.832Z",
      "name": "tournamentState",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "xafsqlu4",
          "name": "tournament",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "m7crr6xhbpmojf9",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "yfsljxme",
          "name": "rounds",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "i516ul75wdrye2i",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "cq3xac7j",
          "name": "currentRound",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "i516ul75wdrye2i",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "sk4atswj",
          "name": "tournamentState",
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
          "id": "ug0lvmb5",
          "name": "matchState",
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
          "id": "qr4ionwe",
          "name": "roundState",
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
          "id": "50f3psyf",
          "name": "bracket",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        }
      ],
      "listRule": "@request.auth.id != \"\"",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\"",
      "updateRule": "@request.auth.id != \"\"",
      "deleteRule": "@request.auth.id != \"\"",
      "options": {}
    },
    {
      "id": "i516ul75wdrye2i",
      "created": "2023-03-27 23:10:32.988Z",
      "updated": "2023-04-10 23:53:05.675Z",
      "name": "round",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "cwvkjog8",
          "name": "tournament",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "m7crr6xhbpmojf9",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "lfxtizvo",
          "name": "matches",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "kp26rxbef1yalup",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "9fuz5nt9",
          "name": "currentMatch",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "kp26rxbef1yalup",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "bh7tf9r3",
          "name": "nextRound",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "i516ul75wdrye2i",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        }
      ],
      "listRule": "@request.auth.id != \"\"",
      "viewRule": "",
      "createRule": "@request.auth.id = tournament.host.id",
      "updateRule": "@request.auth.id != \"\"",
      "deleteRule": "@request.auth.id != \"\"",
      "options": {}
    },
    {
      "id": "kp26rxbef1yalup",
      "created": "2023-03-27 23:10:38.162Z",
      "updated": "2023-04-10 23:52:59.066Z",
      "name": "match",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "1ftohtps",
          "name": "round",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "i516ul75wdrye2i",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "nmnqiz1x",
          "name": "submission1",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "j683w9bodvohn1x",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "gunnc5mg",
          "name": "submission2",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "j683w9bodvohn1x",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "jglahygc",
          "name": "userVotes1",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "itoc7hs6x2i4e1v",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "r2wlczuj",
          "name": "userVotes2",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "itoc7hs6x2i4e1v",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "xlrsk3yo",
          "name": "winner",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "j683w9bodvohn1x",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "rrrfdh4t",
          "name": "nextMatch",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "kp26rxbef1yalup",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        }
      ],
      "listRule": "@request.auth.id != \"\"",
      "viewRule": "",
      "createRule": "@request.auth.id = round.tournament.host.id",
      "updateRule": "@request.auth.id != \"\"",
      "deleteRule": "@request.auth.id != \"\"",
      "options": {}
    },
    {
      "id": "j683w9bodvohn1x",
      "created": "2023-03-27 23:10:44.729Z",
      "updated": "2023-04-03 02:46:04.611Z",
      "name": "submission",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "3juoxuv0",
          "name": "userTournament",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "lc0uwiv4imoemea",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "p8qdxwgg",
          "name": "title",
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
          "id": "nr0nk1x6",
          "name": "description",
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
          "id": "k9rakpxa",
          "name": "image",
          "type": "file",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [],
            "thumbs": []
          }
        },
        {
          "system": false,
          "id": "d0pxwgbl",
          "name": "comments",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "6elt0g070cf7c5d",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": []
          }
        }
      ],
      "listRule": "@request.auth.id != \"\"",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\"",
      "updateRule": "@request.auth.id = userTournament.user.id",
      "deleteRule": "@request.auth.id = userTournament.user.id",
      "options": {}
    },
    {
      "id": "6elt0g070cf7c5d",
      "created": "2023-03-27 23:10:53.065Z",
      "updated": "2023-03-27 23:26:22.875Z",
      "name": "userComment",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "o5fgmlcs",
          "name": "author",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "79nf1zxe",
          "name": "text",
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
          "id": "gg1mp5d5",
          "name": "submission",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "j683w9bodvohn1x",
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
    },
    {
      "id": "itoc7hs6x2i4e1v",
      "created": "2023-03-27 23:11:00.479Z",
      "updated": "2023-04-10 22:05:52.387Z",
      "name": "userVote",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "5etyuvny",
          "name": "user",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "ylsyjfnq",
          "name": "match",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "kp26rxbef1yalup",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        }
      ],
      "listRule": "@request.auth.id != \"\"",
      "viewRule": "@request.auth.id != \"\"",
      "createRule": "@request.auth.id != \"\"",
      "updateRule": "@request.auth.id != \"\"",
      "deleteRule": "@request.auth.id != \"\"",
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
