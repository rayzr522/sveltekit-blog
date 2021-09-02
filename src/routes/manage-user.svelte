<script>
    import { session } from '$app/stores'
    import ErrorMessage from '$lib/components/ErrorMessage.svelte'

    let jwt = null
    let error = ''

    async function fetchJwt() {
        const response = await fetch('/api/session')

        if (!response.ok) {
            error = await response.text()
            return
        }

        jwt = await response.json()
    }

    async function deleteUser() {
        const response = await fetch('/api/delete-user', { method: 'POST' })

        if (!response.ok) {
            error = await response.text()
            return
        }

        $session.user = null
    }
</script>

<svelte:head>
    <title>Auth Check</title>
</svelte:head>

{#if error}
    <ErrorMessage>{error}</ErrorMessage>
{/if}
<pre>JWT: {JSON.stringify(jwt)}</pre>
<button on:click={fetchJwt}>Fetch JWT</button>

<button on:click={deleteUser}>Delete User</button>
