<script lang="ts">
  import type { Tournament } from "$lib/types/types";
  export let data: Tournament;
</script>

<div class="flex flex-col items-center h-full w-full pt-12 text-black">
  <div class="flex flex-row">
    <div class="avatar">
      <div class="w-24 rounded">
        <img
          src="https://cdn.pixabay.com/photo/2022/11/14/18/27/ai-generated-7592244_960_720.jpg"
          alt="Tournament thumbnail"
        />
      </div>
    </div>
    <h1 class=" border-l-1 text-4xl text-center p-5">{data.title}</h1>
  </div>

  <div class="flex flex-row gap-8">
    <div class="flex flex-col">
      <h2>Description:</h2>
      <p>{data.description}</p>
    </div>
    <div class="flex flex-col">
      <h2>Participants:</h2>
      <p>{data.registeredUsers.length}/{data.maxPlayers}</p>
    </div>
    <div class="flex flex-col">
      <h2>Max submissions:</h2>
      <p>{data.maxSubmissions}</p>
    </div>
  </div>
  <div class="flex flex-row gap-8">
    <div class="flex flex-col">
      <h2>Status:</h2>
      <p>{data.status}</p>
    </div>
  </div>

</div>
