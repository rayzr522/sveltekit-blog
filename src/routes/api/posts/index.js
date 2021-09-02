import { getPostsCollection } from '$lib/server/mongo'
import { StandardRespones } from '$lib/server/responses'
import { createSlugFromTitle } from '$lib/shared/slug'
import { v4 as uuid } from 'uuid'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(request) {
    // clamp between 1-100
    const limit = Math.max(
        Math.min(parseInt(request.query.get('limit') || '25', 10), 100),
        1
    )
    // clamp between 0-inf
    const page = Math.max(parseInt(request.query.get('page') || '0', 10), 0)
    // optional author UUID to filter by
    const authorUuid = request.query.get('authorUuid')

    const postsCollection = await getPostsCollection()
    const posts = await postsCollection
        .aggregate([
            { $sort: { creationTimestamp: -1 } },
            ...(authorUuid ? [{ $match: { authorUuid } }] : []),
            { $skip: page * limit },
            { $limit: limit },
            {
                $lookup: {
                    from: 'users',
                    localField: 'authorUuid',
                    foreignField: 'uuid',
                    as: 'author',
                    pipeline: [{ $project: { username: true, uuid: true } }],
                },
            },
            { $unwind: '$author' },
            // strip internal mongo IDs
            {
                $project: {
                    _id: false,
                    author: {
                        _id: false,
                    },
                },
            },
        ])
        .toArray()

    return {
        body: posts,
    }
}

/** @type {import('@sveltejs/kit').RequestHandler} */
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
