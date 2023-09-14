<script lang="ts">
	import { enhance } from '$app/forms';

export let data;
export let form;
let isEditting = false
    $: ({ links } = data)
function editting(i,isEditting:boolean){
  links[i].isEditting=!isEditting
}

  </script>


<form method="POST" action="?/createLink" use:enhance>
    <label>
        title
        <input name="title" type="text" required >
    </label>
    <label>
        link
        <input  name="link" type="text" required >
    </label>
    <button>Create </button>
</form>
{#if form?.success}
  <p>Added links! 🥳</p>

  {:else if form?.deleted}
  <p>Deleted links! 🥳</p>
 
{/if}

    {#each links as Dlink, i}
     
        {#if !links[i].isEditting}
        <h1>{Dlink.title}</h1>
        <h2>{Dlink.link}</h2>
        <button on:click={() => editting(i, false)}>Edit</button>
        {:else }
        <form method="POST" action="?/updateLink" use:enhance>
          <input type="hidden" name="id" value={Dlink.id} />
        <input type="text" name="title" required bind:value={Dlink.title}>
        <input type="text" name="link" required bind:value={Dlink.link}>
        <button>Save</button>
        </form>
        {/if}

        
        
        <form method="POST" action="?/deleteLink" use:enhance>
          <input type="hidden" name="id" value={Dlink.id} />
          <button class="delete" type="submit">❌</button>
        </form>
        
    {/each}
    