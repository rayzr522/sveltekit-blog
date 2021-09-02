const SLUG_SUFFIX_CHARS = 'abcdefghijklmnopqrstuvwxyz1234567890'

const generateRandomSuffix = (length = 8) =>
    Array(length)
        .fill(0)
        .map(
            () =>
                SLUG_SUFFIX_CHARS[~~(Math.random() * SLUG_SUFFIX_CHARS.length)]
        )
        .join('')

export const createSlugFromTitle = (title) => {
    const sanitizedTitle = title.replace(/[^a-zA-Z0-9-]+/, '-').toLowerCase()
    const suffix = generateRandomSuffix()
    return `${sanitizedTitle}-${suffix}`
}
