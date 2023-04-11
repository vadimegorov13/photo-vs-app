migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("itoc7hs6x2i4e1v");

    collection.viewRule = "";

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("itoc7hs6x2i4e1v");

    collection.viewRule = null;

    return dao.saveCollection(collection);
  }
);
