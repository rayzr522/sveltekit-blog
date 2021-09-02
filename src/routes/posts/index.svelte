<script context="module">
    export async function load({ fetch, page }) {
        return {
            props: {
                posts: await fetch(`/api/posts?${page.query}`).then((res) =>
                    res.json()
                ),
            },
        }
    }
</script>

<script>
    import PostList from '$lib/components/posts/PostList.svelte'

    export let posts
</script>

<PostList {posts} />
