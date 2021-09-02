<script>
    import { user } from '$lib/user'
    import Navbar from '$lib/components/Navbar.svelte'
    import { onMount } from 'svelte'

    onMount(() => user.refresh())
</script>

<Navbar />

<main>
    <slot />
</main>

<style>
    main {
        padding: 1em;
    }
</style>
