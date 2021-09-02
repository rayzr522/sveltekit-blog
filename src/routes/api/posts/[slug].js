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
                    pipeline: [
                        {
                            $project: {
                                username: true,
                                uuid: true,
                                _id: false,
                            },
                        },
                    ],
                },
            },
            { $unwind: '$author' },
            { $limit: 1 },
            { $project: { _id: false } },
        ])
        .toArray()

    if (!post) {
        return {
            status: 404,
            body: 'Post not found',
        }
    }

    return {
        body: post,
    }
}
