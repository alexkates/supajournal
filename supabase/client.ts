import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "./types";

type ClientType = "ServerComponentClient";

export default function createSupabaseClient(type: ClientType) {
  switch (type) {
    case "ServerComponentClient":
      return createServerComponentClient<Database>({
        cookies,
      });

    default:
      throw new Error(`Invalid supabase client type: ${type}`);
  }
}
