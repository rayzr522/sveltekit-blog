import { signJwt } from '$lib/jwt'
import { getUsersCollection } from '$lib/mongo'
import bcrypt from 'bcrypt'

export async function post(request) {
    const { username, password } = request.body

    const usersCollection = await getUsersCollection()
    const existingUser = await usersCollection.findOne({ username })

    if (!existingUser) {
        return {
            status: 400,
            body: 'User does not exist!',
        }
    }

    const matches = await bcrypt.compare(password, existingUser.hash)

    if (!matches) {
        return {
            status: 401,
            body: 'Bad password!',
        }
    }

    const payload = {
        username,
    }

    const jwt = signJwt(payload)

    return {
        headers: {
            'set-cookie': [`jwt=${jwt}; Max-Age=${7 * 24 * 60 * 60}; Path=/;`],
        },
        body: payload,
    }
}
