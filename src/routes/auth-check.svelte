<script>
    let jwt = null
    let error = ''

    async function fetchJwt() {
        const response = await fetch('/api/authenticated')

        if (!response.ok) {
            error = await response.text()
            return
        }

        jwt = await response.json()
    }
</script>

<svelte:head>
    <title>Auth Check</title>
</svelte:head>

{#if error}
    <p class="error">{error}</p>
{/if}
<pre>JWT: {JSON.stringify(jwt)}</pre>
<button on:click={fetchJwt}>Fetch JWT</button>

<style>
    .error {
        color: red;
    }
</style>
