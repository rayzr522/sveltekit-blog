import { getUsersCollection } from '$lib/server/mongo'

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function get(request) {
    const { username } = request.params

    const usersCollection = await getUsersCollection()
    const [user] = await usersCollection
        .aggregate([
            { $match: { username } },
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
