/* eslint-disable @typescript-eslint/no-explicit-any */
import PocketBase from "pocketbase";

export const client = new PocketBase(import.meta.env.VITE_POCKETBASE_API);
