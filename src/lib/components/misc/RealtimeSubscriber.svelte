<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { client } from "$lib/pocketbase";
  import { serializeNonPOJOs } from "$lib/helpers";

  export let collectionName: string;
  export let id: string;
  export let expand: string;
  export let onUpdate: (data: any) => void;
  export let relationId: string = "";
  export let relationName: string = "";

  let unsubscribe: () => void;

  const subscribeToRecord = async () => {
    try {
      // Subscribe to realtime updates
      unsubscribe = await client.collection(collectionName).subscribe(id, async ({ action }) => {
        if (action === "update") {
          const result = await client
            .collection(relationName ? relationName : collectionName)
            .getOne(relationId ? relationId : id, { expand });
          onUpdate(serializeNonPOJOs(result));
        }
      });

      // Fetch the record
    } catch (error) {
      console.log(error);
    }
  };

  onMount(subscribeToRecord);

  // Unsubscribe from realtime updates
  onDestroy(() => {
    unsubscribe?.();
  });
</script>
