<script>
    import PostItem from './PostItem.svelte'

    export let posts
</script>

<div class="posts">
    {#each posts as post (post.uuid)}
        <PostItem {post} />
    {/each}
</div>

<style>
    .posts {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
</style>
