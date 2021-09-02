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

<h1>About</h1>
<p>What's up?</p>

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
