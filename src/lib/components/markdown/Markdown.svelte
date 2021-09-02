<script>
    import SvelteMarkdown from 'svelte-markdown'
    import ImageRenderer from './renderer/ImageRenderer.svelte'

    export let source
</script>

<SvelteMarkdown {source} renderers={{ image: ImageRenderer }} />
