<script context="module">
    export async function load({ fetch, page }) {
        return {
            props: {
                post: await fetch(
                    `/api/posts/${page.params.slug}`
                ).then((res) => res.json()),
            },
        }
    }
</script>

<script>
    import SvelteMarkdown from 'svelte-markdown'

    export let post
</script>

<h1>{post.title}</h1>
<i>
    Written by <strong>@{post.author.username}</strong> on
    <strong>{new Date(post.creationTimestamp).toLocaleString()}</strong>
</i>
<SvelteMarkdown source={post.content} />
