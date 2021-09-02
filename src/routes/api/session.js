/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(request) {
    if (!request.locals.session) {
        return {
            status: 401,
            message: 'Unauthorized',
        }
    }

    return {
        body: request.locals.session,
    }
}
