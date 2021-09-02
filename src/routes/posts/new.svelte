<script>
    import { goto } from '$app/navigation'
    import ErrorMessage from '$lib/components/ErrorMessage.svelte'

    let title = ''
    let tags = ''
    let content = ''

    let error = ''

    $: canSubmit = title && content

    async function create() {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                tags: tags
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter((tag) => tag.length),
                content,
            }),
            headers: {
                'content-type': 'application/json',
            },
        })

        if (!response.ok) {
            error = await response.text()
            return
        }

        const newPost = await response.json()

        goto(`/posts/${newPost.slug}`)
    }
</script>

<div class="root">
    {#if error}
        <ErrorMessage>{error}</ErrorMessage>
    {/if}

    <div class="settings">
        <input
            type="text"
            name="title"
            placeholder="Title"
            bind:value={title} />
        <input type="text" name="tags" placeholder="Tags" bind:value={tags} />
    </div>

    <textarea placeholder="Post content" bind:value={content} class="content" />
    <button on:click={create} class:primary={canSubmit}>Create Post</button>
</div>

<style>
    .root {
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 2em;
        max-width: 600px;
    }
    .settings {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }
    .settings input {
        flex-grow: 1;
    }
    .content {
        height: 30em;
        width: 100%;
        resize: none;
    }
</style>
