import { verifyAndDecodeJwt } from '$lib/jwt'
import cookie from 'cookie'

const getUser = (request) => {
    const cookies = cookie.parse(request.headers.cookie)
    if (cookies.jwt) {
        return verifyAndDecodeJwt(cookies.jwt)
    }
}

export async function handle({ request, resolve }) {
    request.locals.session = getUser(request)
    return await resolve(request)
}

export async function getSession(request) {
    return {
        user: getUser(request),
    }
}
