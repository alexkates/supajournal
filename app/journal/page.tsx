import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/supabase/types";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });

  return <main className="flex flex-col items-center justify-center w-full h-full"></main>;
}
