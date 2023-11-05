<script lang="ts">
    import "../styles/styles.css";
    export let isAuthenticated: boolean;
    export let principal: Principal | null;
    export let handleLogout: () => void;
    export let toggleSignup: () => void;

    import { onMount } from "svelte";
    import { backend } from "../declarations/backend/index.js";
    import { Principal } from "azle";
    import Contest from "./Contest.svelte";

    let gardenerName: string | null = null;
    let isInitialized = false;
    let gardener;
    let balance: bigint;
    let symbol: string;

    const fetchBalance = async () => {
        const result = await backend.getBalance({owner: principal, subaccount: []});
        symbol = await backend.getIcrcSymbol();
        balance = ('Ok' in result) ? result.Ok : null;
    };
    
    onMount(async () => {
        if (isAuthenticated && principal) {
            const result = await backend.getGardener(principal);
            gardener = result[0];
            gardenerName = gardener ? gardener.info.name : null;
            fetchBalance(); 
            isInitialized = true;
        }
    });

    const handleSignup = () => {
        toggleSignup();
        console.log(`signup: ${principal}`);
    };

    let showContestPage = false;
    const showContest = () => {
        showContestPage = true;
    }
    const hideContest = () => {
        showContestPage = false;
    }

</script>

<main
    class="home-page"
    style={isAuthenticated
        ? "background-image: url('../assets/garden.jpg');"
        : "background-image: none;"}
>
    {#if isAuthenticated && isInitialized}
        {#if gardenerName !== null}
            <div class="info-container">
                <h3>Welcome back to GardenVille</h3>
                <div class="info-item">Name: {gardener.info.name}</div>
                <div class="info-item">Contact: {gardener.info.contact}</div>
                {#if balance !== undefined}
                    <div class="info-item">Current Balance: {balance} {symbol}</div>
                {:else}
                    <div class="info-item">Loading balance...</div>
                {/if}
            </div>
            <div class="actions-container">
                {#if showContestPage}
                    <button class="contest-button" on:click={hideContest}>Done</button>
                {:else}
                    <button class="contest-button" on:click={showContest}>Contest</button>
                {/if}
            </div>
            {#if showContestPage} <Contest />{/if}

        {:else}
            <h1>Welcome to GardenVille!</h1>
            <h2>Sign up to start your Gardening Journey</h2>
            <button class="signup-button" on:click={handleSignup}>Signup</button>
        {/if}
        <img src="../assets/icp-logo.png" alt="ICP Logo" class="icp-logo" />
        <button class="logout-button" on:click={handleLogout}>Logout</button>
    {/if}
</main>
