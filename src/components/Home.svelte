<script lang="ts">
    import "../styles/styles.css";
    export let isAuthenticated: boolean;
    export let principal: Principal | null;
    export let handleLogout: () => void;
    export let toggleSignup: () => void;

    import { onMount } from "svelte";
    import { backend } from "../declarations/backend/index.js";
    import { Principal } from "azle";

    let gardenerName: string | null = null;
    let isInitialized = false;
    let gardener;
    let amount: bigint;
    let symbol: string;

    const fetchBalance = async () => {
        const result = await backend.getBalance({owner: principal, subaccount: []});
        symbol = await backend.getIcrcSymbol();
        amount = ('Ok' in result) ? result.Ok : null;
        console.log(result);
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

</script>

<main
    class="home-page"
    style={isAuthenticated
        ? "background-image: url('../assets/garden.jpg');"
        : "background-image: none;"}
>
    {#if isAuthenticated && isInitialized}
        {#if gardenerName !== null}
            <h1>Welcome back to GardenVille!</h1>
            <div class="info-container">
                <div class="info-item">Name: {gardener.info.name}</div>
                <div class="info-item">Contact: {gardener.info.contact}</div>
                {#if amount !== undefined}
                    <div class="info-item">Current Balance: {amount} {symbol}</div>
                {:else}
                    <div class="info-item">Loading balance...</div>
                {/if}
            </div>
        {:else}
            <h1>Welcome to GardenVille!</h1>
            <h2>Sign up to start your Gardening Journey</h2>
            <button class="signup-button" on:click={handleSignup}>Signup</button>
        {/if}
        <img src="../assets/icp-logo.png" alt="ICP Logo" class="icp-logo" />
        <button class="logout-button" on:click={handleLogout}>Logout</button>
    {/if}
</main>
