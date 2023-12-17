"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

type Props = {
  email: string;
};

export default function AvatarMenu({ email }: Props) {
  const router = useRouter();

  async function signOut() {
    const supabase = createClientComponentClient();

    await supabase.auth.signOut();

    router.push("/journal");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="items-center flex">
        <span className="text-sm">{email}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button onClick={signOut}>Sign out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
