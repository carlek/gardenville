<script lang='ts'>
  import Login from '../components/Login.svelte';
  export let isAuthenticated : boolean;
  export let principal : string;
  import { backend } from "../declarations/backend/index.js";

  let gardenerId : string;
  const initHome = async() => {
    const caller = await backend.principalCaller();
    gardenerId = caller.toString();
  }
  initHome();

  const handleLogout = () => {
    isAuthenticated = false;
  };
</script>

<main class="home-page"
  style={isAuthenticated ? "background-image: url('../assets/garden.jpg');"
                         : "background-image: none;"}>

  {#if isAuthenticated}
    <h1>Welcome {principal} to GardenVille!</h1>
    <button class="logout-button" on:click={handleLogout}>Logout</button> 
  {:else}
    <Login bind:isAuthenticated bind:principal/>
  {/if}
</main>

<style>
  .home-page {
    background-image: url('../assets/garden.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: white;
    position: relative;
  }

  .logout-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: #646cff; /* Background color for the button */
    border: none;
    color: white;
    padding: 0.5rem 1rem; /* Added padding for the button */
    border-radius: 4px; /* Rounded corners for the button */
    font-weight: bold; /* Make the text bold for better visibility */
    cursor: pointer;
    transition: background-color 0.2s; /* Smooth transition for hover effect */
    &:hover {
      background-color: #e62828;
    }
  }
</style>
