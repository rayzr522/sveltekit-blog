import { MongoClient } from 'mongodb'

/** @type {MongoClient} */
let _mongoClient

export const getMongoClient = async () => {
    if (!_mongoClient) {
        _mongoClient = new MongoClient('mongodb://localhost:27017/app')
        await _mongoClient.connect()
    }
    return _mongoClient
}
export const getDb = async () => (await getMongoClient()).db('app')
export const getUsersCollection = async () =>
    (await getDb()).collection('users')
