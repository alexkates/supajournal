import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Database } from "@/supabase/types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  email: string;
};

export default function AvatarMenu({ email }: Props) {
  async function signOut() {
    "use server";
    const supabase = createServerActionClient<Database>({
      cookies,
    });

    await supabase.auth.signOut();

    redirect("/auth/sign-in");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="text-xs">{email}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <form action={signOut}>
            <button type="submit">Sign out</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
