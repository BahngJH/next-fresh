import { MongoClient } from 'mongodb'

const url = 'mongodb+srv://admin:dhsfkdls00@cluster0.rc9gvez.mongodb.net/'
let connectDB

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url).connect()
}

export { connectDB }