import { getUsersCollection } from '$lib/server/mongo'
import { StandardRespones } from '$lib/server/responses'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {
    const user = request.locals.session
    if (!user) {
        return StandardRespones.UNAUTHORIZED
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
