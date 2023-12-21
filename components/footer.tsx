import React from "react";

export default function Footer() {
  return (
    <div>
      {" "}
      Powered by{" "}
      <a href="https://supabase.io" target="_blank" rel="noopener noreferrer" className="text-gradient underline text-primary">
        Supabase
      </a>{" "}
      and{" "}
      <a href="https://openai.com" target="_blank" rel="noopener noreferrer" className="underline text-primary">
        OpenAI
      </a>
    </div>
  );
}
