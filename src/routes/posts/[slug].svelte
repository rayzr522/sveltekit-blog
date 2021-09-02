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
    import Markdown from '$lib/components/markdown/Markdown.svelte'
    import TimezoneDate from '$lib/components/TimezoneDate.svelte'

    export let post
</script>

<h1>{post.title}</h1>
<i>
    Written by <strong>@{post.author.username}</strong> on
    <strong><TimezoneDate timestamp={post.creationTimestamp} /></strong>
</i>
<div>
    <Markdown source={post.content} />
</div>
