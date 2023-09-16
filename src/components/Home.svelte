<script lang='ts'>

  export let isAuthenticated : boolean;
  export let principal : string | null;
  export let handleLogout: () => void;

  import { onMount } from 'svelte';
  import { backend } from "../declarations/backend/index.js";

  let gardenerName : string | null = null;

  onMount(async () => {
    if (isAuthenticated && principal) {
      const result = await backend.getGardener(principal);
      const gardener = result[0];
      gardenerName = gardener ? gardener.info.name : null;
    }
  });

  const handleSignup = () => {
    console.log(`signup: ${principal}`);
  };

</script>

<main class="home-page"
  style={isAuthenticated ? "background-image: url('../assets/garden.jpg');"
                         : "background-image: none;"}>

  {#if isAuthenticated}
    {#if gardenerName}
      <h1>Welcome {gardenerName} to GardenVille!</h1>
    {:else}
      <h1>Welcome New User to GardenVille!</h1>
      <button class="signup-button" on:click={handleSignup}>Signup</button>
    {/if}
    <button class="logout-button" on:click={handleLogout}>Logout</button> 
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
  .signup-button {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
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
