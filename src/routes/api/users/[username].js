import { getUsersCollection } from '$lib/server/mongo'
import { StandardRespones } from '$lib/server/responses'

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function get(request) {
    const { username } = request.params
    if (username === '@me' && !request.locals.session) {
        return StandardRespones.UNAUTHORIZED
    }

    const realUsername =
        username === '@me' ? request.locals.session.username : username

    const usersCollection = await getUsersCollection()
    const [user] = await usersCollection
        .aggregate([
            { $match: { username: realUsername } },
            { $limit: 1 },
            { $project: { username: true, uuid: true, _id: false } },
        ])
        .toArray()

    if (!user) {
        return {
            status: 404,
            body: 'User not found!',
        }
    }

    return {
        body: user,
    }
}
