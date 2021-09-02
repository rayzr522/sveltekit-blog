<script>
    import { page } from '$app/stores'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    export let href
    $: active = $page.path === href.replace(/[?#].*$/, '')
</script>

<a
    sveltekit:prefetch={!!href}
    {href}
    class:active
    on:click={(e) => dispatch('click', e)}>
    <slot />
</a>

<style>
    a {
        color: inherit;
        text-decoration: none;
        text-transform: uppercase;
    }

    .active {
        font-weight: bold;
    }
</style>
