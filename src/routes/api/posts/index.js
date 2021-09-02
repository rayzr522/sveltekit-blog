import { getPostsCollection } from '$lib/server/mongo'
import { StandardRespones } from '$lib/server/responses'
import { createSlugFromTitle } from '$lib/shared/slug'
import { v4 as uuid } from 'uuid'

export async function post(request) {
    const user = request.locals.session
    if (!user) {
        return StandardRespones.UNAUTHORIZED
    }

    const { title, tags, content } = request.body
    if (!title || !content) {
        return {
            status: 400,
            body: 'Both title & content are required!',
        }
    }

    const newPost = {
        title,
        tags,
        content,
        slug: createSlugFromTitle(title),
        creationTimestamp: Date.now(),
        uuid: uuid(),
        authorUuid: user.uuid,
    }

    const postsCollection = await getPostsCollection()
    await postsCollection.insertOne(newPost)

    return {
        body: newPost,
    }
}
