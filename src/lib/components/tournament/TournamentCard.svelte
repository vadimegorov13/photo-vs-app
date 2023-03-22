<script lang="ts">
  export let tournament: any;
  console.log(tournament);
</script>

<div class="card md:card-side bg-base-100 shadow-xl">
  <figure>
    <img
      src="https://cdn.pixabay.com/photo/2022/11/14/18/27/ai-generated-7592244_960_720.jpg"
      alt="Movie"
    />
  </figure>
  <div class="card-body">
    <h2 class="card-title">{tournament.expand.tournament.title}</h2>
    <p>{tournament.expand.tournament.description}</p>
    <p>
      Participants:
      <slug
        >{tournament.expand.tournament.registeredUsers.length}/{tournament.expand.tournament
          .maxPlayers}</slug
      >
    </p>
    <p>
      Max submissions:
      <slug>{tournament.expand.tournament.maxSubmissions}</slug>
    </p>
    <div class="flex flex-row">
      <p>
        You've submitted
        <slug>{tournament.submissions.length}</slug> images
      </p>
      <div class="card-actions justify-end">
        <a sapper:prefetch rel="external" href={`/tournament/submission/${tournament.tournament}`}>
          <button class="btn btn-primary">Submit photo</button>
        </a>
      </div>
    </div>
  </div>
</div>
