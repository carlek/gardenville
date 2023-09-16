<script lang='ts'>

  export let isAuthenticated : boolean;
  export let principal : string | null;
  export let handleLogout: () => void;

  import { onMount } from 'svelte';
  import { backend } from "../declarations/backend/index.js";

  let gardenerName : string | null = null;
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
    console.log(`signup: ${principal}`);
  };

</script>

<main class="home-page"
  style={isAuthenticated ? "background-image: url('../assets/garden.jpg');"
                         : "background-image: none;"}>

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
    width: 100vh;
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
  .icp-logo {
    width: 60px;    
    position: absolute;
    top: 1rem;
    left: 5%;
    transition: transform 0.3s; /* Add transition */
  }

  .icp-logo:hover {
    animation: spin 1s linear; /* Add animation on hover */
  }

  @keyframes spin {
    0% { transform: rotate(0deg); } /* Start at 0 degrees */
    100% { transform: rotate(360deg); } /* End at 360 degrees (1 full revolution) */
  }


</style>
