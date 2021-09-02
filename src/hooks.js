import { verifyAndDecodeJwt } from '$lib/server/jwt'
import cookie from 'cookie'

const getUser = (request) => {
    if (!request.headers.cookie) {
        return null
    }

    const cookies = cookie.parse(request.headers.cookie)
    if (cookies.jwt) {
        return verifyAndDecodeJwt(cookies.jwt)
    }
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
    request.locals.session = getUser(request)
    return await resolve(request)
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession(request) {
    return {
        user: getUser(request),
    }
}
