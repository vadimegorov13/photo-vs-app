import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  // we only use this endpoint for the api
  // and don't need to see the page
  throw redirect(302, '/')
}

export const actions: Actions = {
  default({ locals }) {
    locals.pb.authStore.clear();
    throw redirect(303, "/");
  },
}