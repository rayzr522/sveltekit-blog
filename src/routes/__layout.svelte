<script context="module">
    export function load({ session }) {
        return { props: { session } }
    }
</script>

<script>
    export let session

    import { user } from '$lib/user'
    import Navbar from '$lib/components/Navbar.svelte'

    if (session.user) {
        user._set(session.user)
    }
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
