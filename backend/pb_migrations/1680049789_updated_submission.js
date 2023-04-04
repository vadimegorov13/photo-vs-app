migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j683w9bodvohn1x")

  collection.updateRule = "@request.auth.id != userTournament.user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j683w9bodvohn1x")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
