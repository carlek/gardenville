<script lang="ts">
    import "./App.css";
    import { onMount } from "svelte";
    import Login from "./components/Login.svelte";
    import Home from "./components/Home.svelte";
    import Signup from "./components/Signup.svelte";
    import { Principal } from "azle";

    let isAuthenticated: boolean = false;
    let principal: Principal | null = null;
    let gardener;

    onMount(() => {
        const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
        const storedPrincipal = localStorage.getItem("principal");

        if (storedIsAuthenticated === "true" && storedPrincipal) {
            isAuthenticated = true;
            principal = Principal.fromText(storedPrincipal);
        }
    });
    

    const handleLogout = () => {
        isAuthenticated = false;
        principal = null;
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("principal");
    };

    let showSignup = false;
    export const toggleSignup = () => {
        showSignup = !showSignup;
    };

</script>

<main>
    {#if showSignup}
        <Signup {isAuthenticated} {principal} {toggleSignup}/>
    {:else}
        {#if isAuthenticated}
            <Home {isAuthenticated} {principal} {handleLogout} {toggleSignup} {gardener}/>
        {:else}
            <Login bind:isAuthenticated bind:principal />
        {/if}
    {/if}
</main>
