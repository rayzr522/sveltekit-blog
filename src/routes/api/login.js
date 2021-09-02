import { signJwt } from '$lib/server/jwt'
import { getUsersCollection } from '$lib/server/mongo'
import bcrypt from 'bcryptjs'

export async function post(request) {
    const { username, password, timezone } = request.body

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
            body: 'Incorrect password!',
        }
    }

    const payload = {
        username: existingUser.username,
        uuid: existingUser.uuid,
        timezone,
    }

    const jwt = signJwt(payload)

    return {
        headers: {
            'set-cookie': [`jwt=${jwt}; Max-Age=${7 * 24 * 60 * 60}; Path=/;`],
        },
        body: payload,
    }
}
