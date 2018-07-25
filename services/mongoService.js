var dbConn = null

function connectToMongo() {
  // Reuse existing connection if exist
  if (dbConn) return Promise.resolve(dbConn)
  const MongoClient = require('mongodb').MongoClient
  const url = 'mongodb://PaveRoot:Groot123@ds145881.mlab.com:45881/pave'
//   const url = !process.env.PORT
//     ? 'mongodb://localhost:27017/pave'
//     : 'mongodb://PaveRoot:Groot123@ds145881.mlab.com:45881/pave'

  return MongoClient.connect(url).then(client => {
    console.log('Connected to MongoDB')

    // If we get disconnected (e.g. db is down)
    client.on('close', () => {
      console.log('MongoDB Diconnected!')
      dbConn = null
    })
    dbConn = client.db()
    return dbConn
  })
}

module.exports = {
 connectToMongo
}
