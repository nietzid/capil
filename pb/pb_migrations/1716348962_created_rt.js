/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "7qq57l9rontn7bi",
    "created": "2024-05-22 03:36:02.003Z",
    "updated": "2024-05-22 03:36:02.003Z",
    "name": "rt",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "4tr6bd4v",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "othbnhbp",
        "name": "rw",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "fetr1qauoxgtlbm",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
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
  const collection = dao.findCollectionByNameOrId("7qq57l9rontn7bi");

  return dao.deleteCollection(collection);
})
