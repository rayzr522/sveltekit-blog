import { StandardRespones } from '$lib/server/responses'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(request) {
    if (!request.locals.session) {
        return StandardRespones.UNAUTHORIZED
    }

    return {
        body: request.locals.session,
    }
}
