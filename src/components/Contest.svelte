<script lang="ts">
    import { Principal } from "azle";
    import "../styles/styles.css";
    export let principal: Principal | null;

    let contestEntries = [
        { id: 1, name: "Entry 1" },
        { id: 2, name: "Entry 2" },
        { id: 3, name: "Entry 3" },
        // Add more entries as needed
    ];

    let selectedEntry = null;
    let voteMessage = null;

    const vote = () => {
        if (selectedEntry !== null) {
            voteMessage = `You voted for ${selectedEntry.name}`;
        } else {
            voteMessage = "Please select an entry to vote for.";
        }
    };
</script>

<main class="contest-page">
    <div class="actions-container">
        <h2>Contest Entries</h2>
        {#each contestEntries as entry (entry.id)}
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="contest-entry"
                on:click={() => (selectedEntry = entry)}
                on:keydown={(e) => {
                    if (e.key === "Enter") {
                        selectedEntry = entry;
                    }
                }}
                tabindex="0"
                class:selected={selectedEntry === entry}
            >
                {entry.name}
            </div>
        {/each}
        <button class="vote-button" on:click={vote}>Vote</button>
    </div>

    {#if voteMessage !== null}
        <p class="vote-message">{voteMessage}</p>
    {/if}

</main>
