import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  async function signIn(formData: FormData) {
    "use server";

    const supabase = createServerActionClient({ cookies });

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (response.error) {
      return {
        message: `Error: ${response.error.message}`,
      };
    }

    revalidatePath("/sign-in");
    redirect("/journal");
  }

  return (
    <form className="flex flex-col justify-center h-screen items-center w-full gap-8 p-8" action={signIn}>
      <label className="form-control w-full max-w-md">
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <input type="email" className="input input-bordered w-full max-w-md" required />
      </label>

      <label className="form-control w-full max-w-md">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <input type="password" className="input input-bordered w-full max-w-md" required />
      </label>

      <div className="flex items-center justify-evenly w-full max-w-md gap-8">
        <button className="btn btn-primary w-full max-w-md">Sign in</button>
      </div>
    </form>
  );
}
