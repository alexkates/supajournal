import { createServerComponentClient, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "./types";

type ClientType = "ServerComponentClient" | "ServerActionClient";

export default function createSupabaseClient(type: ClientType) {
  switch (type) {
    case "ServerComponentClient":
      return createServerComponentClient<Database>({
        cookies,
      });

    case "ServerActionClient":
      return createServerActionClient<Database>({
        cookies,
      });

    default:
      throw new Error(`Invalid supabase client type: ${type}`);
  }
}
