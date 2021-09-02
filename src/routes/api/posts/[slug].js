import { getPostsCollection } from '$lib/server/mongo'

/**@type {import('@sveltejs/kit').RequestHandler} */
export async function get(request) {
    const { slug } = request.params

    const postsCollection = await getPostsCollection()
    const [post] = await postsCollection
        .aggregate([
            { $match: { slug } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'authorUuid',
                    foreignField: 'uuid',
                    as: 'author',
                },
            },
            { $unwind: '$author' },
            { $limit: 1 },
        ])
        .toArray()

    if (!post) {
        return {
            status: 404,
            body: 'Post not found',
        }
    }

    delete post._id
    delete post.author._id

    return {
        body: post,
    }
}
