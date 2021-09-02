import { getUsersCollection } from '$lib/server/mongo'
import { validatePassword } from '$lib/shared/validation'
import bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {
    const { username, password } = request.body

    const failingRule = validatePassword(password).find((rule) => !rule.passed)
    if (failingRule) {
        return {
            status: 400,
            body: failingRule.name,
        }
    }

    const usersCollection = await getUsersCollection()
    const existingUser = await usersCollection.findOne({ username })

    if (existingUser) {
        return {
            status: 409,
            body: 'User already exists!',
        }
    }

    const hash = await bcrypt.hash(password, 10)

    usersCollection.insertOne({
        username,
        hash,
        uuid: uuid(),
    })

    // success
    return {
        body: {},
    }
}
