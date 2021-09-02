<script>
    export let post
</script>

<div class="post">
    <a href="/posts/{post.slug}">{post.title}</a>
    <i>
        @{post.author.username} - {new Date(
            post.creationTimestamp
        ).toLocaleString()}
    </i>
</div>

<style>
    .post {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        padding: 1em;
        border: 1px solid var(--fg-default);
        border-radius: 3px;
    }
</style>
