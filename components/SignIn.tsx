"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";

const SignIn = () => {
  const supabase = createClientComponentClient();

  return (
    <div className="w-full max-w-md px-4">
      <Auth
        supabaseClient={supabase}
        providers={[]}
        view="sign_in"
        redirectTo="/journal"
        appearance={{
          extend: false,
          className: {
            container: "flex flex-col space-y-4",
            button: "btn btn-primary",
            input: "input input-bordered w-full max-w-md",
            label: "label",
            anchor: "link",
            message: "text-secondary",
          },
        }}
      />
    </div>
  );
};

export default SignIn;
