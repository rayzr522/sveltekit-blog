import { getUsersCollection } from '$lib/server/mongo'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {
    const user = request.locals.session
    if (!user) {
        return {
            status: 401,
            body: 'Unauthorized',
        }
    }

    const usersCollection = await getUsersCollection()
    await usersCollection.deleteOne({ username: user.username })

    return {
        headers: {
            'set-cookie': ['jwt=deleted; Max-Age=0; Path=/;'],
        },
        body: { success: true },
    }
}
