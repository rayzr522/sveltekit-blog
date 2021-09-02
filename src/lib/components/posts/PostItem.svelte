<script>
    import TimezoneDate from '../TimezoneDate.svelte'

    export let post
</script>

<div class="post">
    <a href="/posts/{post.slug}">{post.title}</a>
    <i>
        @{post.author.username} - <TimezoneDate
            timestamp={post.creationTimestamp} />
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
