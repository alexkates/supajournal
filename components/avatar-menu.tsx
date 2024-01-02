"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Database } from "@/supabase/types";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = {
  user: User | null;
};

export default function AvatarMenu({ user }: Props) {
  const router = useRouter();

  async function signOut() {
    const supabase = createClientComponentClient<Database>();

    await supabase.auth.signOut();
    router.refresh();
  }

  const userName = user?.user_metadata?.name || user?.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.user_metadata?.avatar_url} alt="Users image" />
          <AvatarFallback className="uppercase">{userName.substring(0, 1)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{userName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
