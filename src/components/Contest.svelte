<script>
    let contestEntries = [
        { id: 1, name: "Entry 1" },
        { id: 2, name: "Entry 2" },
        { id: 3, name: "Entry 3" },
        // Add more entries as needed
    ];

    let selectedEntry = null;

    const vote = () => {
        if (selectedEntry !== null) {
            alert(`You voted for ${selectedEntry.name}`);
        } else {
            alert("Please select an entry to vote for.");
        }
    };
</script>

<main class="contest-page">
    <h1>Contest Entries</h1>
    {#each contestEntries as entry (entry.id)}
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="entry"
            on:click={() => (selectedEntry = entry)}
            on:keydown={(e) => {
                if (e.key === "Enter") {
                    selectedEntry = entry;
                }
            }}
            tabindex="0"
        >
            {entry.name}
        </div>
    {/each}

    <button on:click={vote}>Vote</button>
</main>






