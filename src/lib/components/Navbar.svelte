<script>
    import { goto } from '$app/navigation'
    import { page, session } from '$app/stores'
    import NavbarItem from './NavbarItem.svelte'

    function logout() {
        document.cookie = 'jwt=; Max-Age=0; Path=/;'
        $session.user = null
        goto('/posts')
    }
</script>

<nav>
    <h1>Blog</h1>
    <NavbarItem href="/posts">Latest Posts</NavbarItem>
    <NavbarItem href="/manage-user">Manage User</NavbarItem>

    {#if $session.user}
        <NavbarItem href="/users/{$session.user.username}/posts"
            >My Posts</NavbarItem>
        <NavbarItem href="/posts/new">New Post</NavbarItem>

        <div class="end">
            <NavbarItem
                href=""
                on:click={(e) => (e.preventDefault(), logout())}>
                Logout ({$session.user.username})
            </NavbarItem>
        </div>
    {:else}
        <div class="end">
            <NavbarItem
                href="/login?r={encodeURIComponent($page.path.slice(1))}">
                Login
            </NavbarItem>
        </div>
    {/if}
</nav>

<style>
    nav {
        background: var(--bg-primary);
        color: var(--fg-primary);
        display: flex;
        align-items: center;
        gap: 1.5em;
        padding: 0.5em 1em;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
        flex-wrap: wrap;
    }
    .end {
        flex-grow: 1;
        display: flex;
        justify-content: flex-end;
    }
    nav h1 {
        margin: 0;
        text-transform: uppercase;
    }
</style>
