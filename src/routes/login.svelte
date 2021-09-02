<script>
    import { goto } from '$app/navigation'
    import { page } from '$app/stores'

    import { user } from '$lib/user'

    let username = ''
    let password = ''
    let error = ''

    async function login() {
        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
            }),
            headers: {
                'content-type': 'application/json',
            },
        })

        if (!res.ok) {
            error = await res.text()
            console.error(error)
            return
        }

        const loggedInUser = await res.json()
        user.refresh()
        goto(`/${$page.query.get('r') || ''}`)
    }

    async function signup() {
        const res = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
            }),
            headers: {
                'content-type': 'application/json',
            },
        })

        if (!res.ok) {
            error = await res.text()
            console.error(error)
            return
        }

        await login()
    }
</script>

<main>
    <h1>Login</h1>
    {#if error}
        <p class="error">{error}</p>
    {/if}
    <form on:submit|preventDefault={login}>
        <div>
            <label for="username">Username</label>
            <input type="text" name="username" bind:value={username} />
        </div>

        <div>
            <label for="password">Password</label>
            <input type="password" name="password" bind:value={password} />
        </div>

        <div>
            <button type="submit" class="primary">Login</button>
            <button type="button" class="secondary" on:click={signup}
                >Signup</button>
        </div>
    </form>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        position: absolute;
        align-items: center;
        justify-content: center;
        z-index: -1;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        align-items: stretch;
        min-width: 320px;
        border: 1px solid var(--fg-default);
        border-radius: 3px;
        padding: 1em;
    }

    form div {
        display: flex;
        gap: 0.5em;
        align-items: center;
        /* width: 100%; */
    }
    form div input {
        margin-left: auto;
        padding: 0.5em;
        outline: none;
        border: 1px solid var(--fg-default);
        border-radius: 3px;
        background: none;
    }
    form div button {
        flex-grow: 1;
        padding: 0.25em;
        border-radius: 3px;
        border: 1px solid var(--fg-default);
    }
    .error {
        color: var(--fg-primary);
        background: var(--bg-alert);
        padding: 0.5em;
        border-radius: 3px;
    }
</style>
