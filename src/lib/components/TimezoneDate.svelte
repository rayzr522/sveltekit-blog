<script context="module">
    const locale = Intl.DateTimeFormat().resolvedOptions()
</script>

<script>
    import { session } from '$app/stores'

    export let timestamp = 0

    $: timeZone = $session.user?.timezone
    $: dateString = new Date(timestamp).toLocaleString(locale, { timeZone })
</script>

{dateString}
