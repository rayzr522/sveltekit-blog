<script>
    import { page } from '$app/stores'
    import { user } from '$lib/user'
    import NavbarItem from './NavbarItem.svelte'
</script>

<nav>
    <h1>Blog</h1>
    <NavbarItem href="/">Home</NavbarItem>
    <NavbarItem href="/about">About</NavbarItem>
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
        gap: 0.5em;
        padding: 0.5em;
        border: 1px solid var(--fg-primary);
        border-radius: 3px;
    }
    nav :last-child {
        margin-left: auto;
    }
    nav h1 {
        margin: 0;
    }
</style>
