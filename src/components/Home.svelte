<script lang="ts">
    export let isAuthenticated: boolean;
    export let principal: string | null;
    export let handleLogout: () => void;
    export let toggleSignup: () => void;

    import { onMount } from "svelte";
    import { backend } from "../declarations/backend/index.js";
    import "../styles/styles.css";

    let gardenerName: string | null = null;
    let isInitialized = false;

    onMount(async () => {
        if (isAuthenticated && principal) {
            const result = await backend.getGardener(principal);
            const gardener = result[0];
            gardenerName = gardener ? gardener.info.name : null;
            isInitialized = true;
        }
    });

    const handleSignup = () => {
        toggleSignup();
        console.log(`signup: ${principal}`);
    };

</script>

<main
    class="home-page"
    style={isAuthenticated
        ? "background-image: url('../assets/garden.jpg');"
        : "background-image: none;"}
>
    {#if isAuthenticated && isInitialized}
        {#if gardenerName !== null}
            <h1>Welcome {gardenerName} to GardenVille!</h1>
        {:else}
            <h1>Welcome to GardenVille!</h1>
            <h2>Sign up to start your Gardening Journey</h2>
            <button class="signup-button" on:click={handleSignup}>Signup</button>
        {/if}
        <img src="../assets/icp-logo.png" alt="ICP Logo" class="icp-logo" />
        <button class="logout-button" on:click={handleLogout}>Logout</button>
    {/if}
</main>
