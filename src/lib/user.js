import { writable } from 'svelte/store'
import cookie from 'cookie'
// import { decodeJwt } from './jwt'

const createUserStore = () => {
    const store = writable(null)

    const refresh = () => {
        if (typeof document !== 'undefined') {
            const cookies = cookie.parse(document.cookie)
            if (cookies.jwt) {
                const rawJson = atob(cookies.jwt.split('.')[1])
                store.set(JSON.parse(rawJson))
            }
        }
    }

    const logout = () => {
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        store.set(null)
    }

    return {
        subscribe: store.subscribe,
        refresh,
        logout,
    }
}

export const user = createUserStore()
