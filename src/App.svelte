<script lang="ts">
    import "./App.css";
    import { onMount } from "svelte";
    import Login from "./components/Login.svelte";
    import Home from "./components/Home.svelte";
    import Signup from "./components/Signup.svelte";

    let isAuthenticated: boolean = false;
    let principal: string | null = null;

    onMount(() => {
        const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
        const storedPrincipal = localStorage.getItem("principal");

        if (storedIsAuthenticated === "true" && storedPrincipal) {
            isAuthenticated = true;
            principal = storedPrincipal;
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
        <Signup {isAuthenticated} />
    {:else}
        {#if isAuthenticated}
            <Home {isAuthenticated} {principal} {handleLogout} {toggleSignup}/>
        {:else}
            <Login bind:isAuthenticated bind:principal />
        {/if}
    {/if}
</main>
