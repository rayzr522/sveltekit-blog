<script>
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    export let on
</script>

<div class="base" on:click={() => dispatch('click')}>
    <div class="knob" class:on />
</div>

<style>
    .base {
        box-sizing: content-box;
        position: relative;
        border: 1px solid var(--fg-default);
        width: 2em;
        height: 1em;
        border-radius: 0.5em;
        box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.3);
    }

    .knob {
        box-sizing: content-box;
        position: absolute;
        top: 0.5em;
        left: 0.5em;
        width: 1em;
        height: 1em;
        transform: translate(-50%, -50%);
        border: 1px solid var(--fg-default);
        border-radius: 0.5em;

        background: var(--bg-default);
        transition: all 75ms;
    }

    .on {
        background: var(--bg-primary);
        left: 1.5em;
    }
</style>
