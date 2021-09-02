<script>
    import { page } from '$app/stores'
    import { user } from '$lib/user'
    import NavbarItem from './NavbarItem.svelte'
</script>

<nav>
    <h1>Blog</h1>
    <NavbarItem href="/">Home</NavbarItem>
    <NavbarItem href="/auth-check">Auth Check</NavbarItem>
    <div>
        {#if !$user}
            <NavbarItem
                href="/login?r={encodeURIComponent($page.path.slice(1))}">
                Login
            </NavbarItem>
        {:else}
            <NavbarItem
                href=""
                on:click={(e) => {
                    e.preventDefault(), user.logout()
                }}>
                Logout ({$user.username})
            </NavbarItem>
        {/if}
    </div>
</nav>

<style>
    nav {
        background: var(--bg-primary);
        color: var(--fg-primary);
        display: flex;
        align-items: center;
        gap: 1em;
        padding: 0.5em 1em;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
    }
    nav :last-child {
        margin-left: auto;
    }
    nav h1 {
        margin: 0;
        text-transform: uppercase;
    }
</style>
