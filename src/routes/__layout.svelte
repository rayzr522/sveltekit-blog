<script>
    import Navbar from '$lib/components/Navbar.svelte'
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
