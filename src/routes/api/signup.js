import { getUsersCollection } from '$lib/server/mongo'
import bcrypt from 'bcrypt'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {
    const { username, password } = request.body
    const usersCollection = await getUsersCollection()
    const existingUser = await usersCollection.findOne({ username })

    if (existingUser) {
        return {
            status: 409,
            body: 'User already exists!',
        }
    }

    const hash = await bcrypt.hash(password, 10)

    await getUsersCollection().insertOne({
        username,
        hash,
    })

    // success
    return {
        body: {},
    }
}
