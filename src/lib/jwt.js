import fs from 'fs'
import jwt from 'jsonwebtoken'

export const signJwt = (payload) => {
    return jwt.sign(payload, getPrivateKey(), {
        expiresIn: '7 days',
        algorithm: 'RS256',
    })
}

export const verifyAndDecodeJwt = (jwtString) => {
    try {
        return { ...jwt.verify(jwtString, getPublicKey()) }
    } catch (e) {
        console.error(e)
        return null
    }
}

export const decodeJwt = (jwtString) => {
    return jwt.decode(jwtString)
}

export const getPrivateKey = () => {
    return fs.readFileSync('./jwt.pem')
}

export const getPublicKey = () => {
    return fs.readFileSync('./jwt.pub')
}
