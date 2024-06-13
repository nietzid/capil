/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "fetr1qauoxgtlbm",
    "created": "2024-05-22 03:35:40.479Z",
    "updated": "2024-05-22 03:35:40.479Z",
    "name": "rw",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dur1yuik",
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
  const collection = dao.findCollectionByNameOrId("fetr1qauoxgtlbm");

  return dao.deleteCollection(collection);
})
