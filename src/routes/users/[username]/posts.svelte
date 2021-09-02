<script context="module">
    /** @type {import('@sveltejs/kit').Load}*/
    export async function load({ fetch, page, session }) {
        const { username } = page.params

        const userResponse = await fetch(`/api/users/${username}`)
        if (!userResponse.ok) {
            return {
                status: userResponse.status,
                error: await userResponse.text(),
            }
        }

        const user = await userResponse.json()

        return {
            props: {
                username,
                posts: await fetch(
                    `/api/posts?${page.query}&authorUuid=${user.uuid}`
                ).then((res) => res.json()),
            },
        }
    }
</script>

<script>
    import PostList from '$lib/components/posts/PostList.svelte'

    export let username
    export let posts
</script>

<svelte:head>
    <title>@{username}'s Posts</title>
</svelte:head>

<PostList {posts} />
