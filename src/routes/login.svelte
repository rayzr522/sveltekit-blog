<script>
    import { goto } from '$app/navigation'
    import { page, session } from '$app/stores'
    import ToggleSwitch from '$lib/components/ToggleSwitch.svelte'
    import { validatePassword } from '$lib/shared/validation'
    import { fade, fly } from 'svelte/transition'

    let signupMode = false
    let username = ''
    let password = ''
    let error = ''

    let usernameField

    $: if ($page.path === '/login' && usernameField) {
        // usernameField is undefined before client hydration, so its safe to use a client only method here
        requestAnimationFrame(() => usernameField.focus())
    }

    $: validationState = signupMode ? validatePassword(password) : []
    $: validationPassed = validationState.every((rule) => rule.passed)
    $: canSubmit = username && password && validationPassed

    function toggleMode() {
        signupMode = !signupMode
        error = ''
        usernameField.focus()
    }

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

        $session.user = await res.json()
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

<svelte:head>
    <title>Login</title>
</svelte:head>

<main>
    {#if error}
        <p class="error">{error}</p>
    {/if}
    <div class="mode-toggle">
        <span class:mode-active={!signupMode}>Login</span>
        <ToggleSwitch on={signupMode} on:click={toggleMode} />
        <span class:mode-active={signupMode}>Signup</span>
    </div>
    <form on:submit|preventDefault={() => (signupMode ? signup() : login())}>
        <div class="group">
            <label for="username">Username</label>
            <input
                type="text"
                name="username"
                bind:value={username}
                bind:this={usernameField} />
        </div>

        <div class="group">
            <label for="password">Password</label>
            <input type="password" name="password" bind:value={password} />
        </div>

        <div class="buttons">
            {#if !signupMode}
                <button
                    type="submit"
                    class:primary={canSubmit}
                    transition:fly|local={{ y: 20, duration: 100 }}
                    disabled={!canSubmit}>
                    Login
                </button>
            {:else}
                <button
                    type="submit"
                    class:secondary={canSubmit}
                    transition:fly|local={{ y: 20, duration: 100 }}
                    disabled={!canSubmit}>
                    Signup
                </button>
            {/if}
        </div>
    </form>

    {#if signupMode && password}
        <ul class="password-reqs">
            {#each validationState as rule (rule.name)}
                <li class:passed={rule.passed}>{rule.name}</li>
            {/each}
        </ul>
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        position: absolute;
        align-items: center;
        justify-content: center;
        gap: 1em;
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

    .group {
        display: flex;
        gap: 0.5em;
        align-items: center;
        /* width: 100%; */
    }
    .group input {
        margin-left: auto;
        padding: 0.5em;
        outline: none;
        border: 1px solid var(--fg-default);
        border-radius: 3px;
        background: none;
        box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.3);
    }
    .buttons {
        flex-grow: 1;
        position: relative;
        height: 2em;
    }
    .buttons button {
        position: absolute;
        width: 100%;
        padding: 0.5em;
        font-size: 1em;
        border-radius: 3px;
        border: 1px solid var(--fg-default);
    }
    .error {
        color: var(--fg-primary);
        background: var(--bg-alert);
        padding: 0.5em;
        border-radius: 3px;
    }
    .mode-toggle {
        display: flex;
        align-items: center;
        gap: 0.5em;
    }
    .mode-active {
        color: var(--bg-secondary);
    }
    .password-reqs {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.25em;
    }
    .password-reqs li {
        list-style: none;
        padding: 0.5em;
        border-radius: 3px;
        background: var(--bg-alert);
        color: var(--fg-alert);
    }
    .password-reqs li.passed {
        background: var(--bg-primary);
        color: var(--fg-primary);
    }
</style>
