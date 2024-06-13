/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g5y47tl9fkpel69")

  // remove
  collection.schema.removeField("pwhutqbh")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g5y47tl9fkpel69")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pwhutqbh",
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
  }))

  return dao.saveCollection(collection)
})
