import { verifyAndDecodeJwt } from '$lib/jwt'
import cookie from 'cookie'

export async function handle({ request, resolve }) {
    const cookies = cookie.parse(request.headers.cookie)
    if (cookies.jwt) {
        const jwt = verifyAndDecodeJwt(cookies.jwt)
        if (jwt) {
            request.locals.session = jwt
        }
    }
    return await resolve(request)
}
