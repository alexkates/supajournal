import React from "react";

export default function Footer() {
  return (
    <div>
      {" "}
      Powered by{" "}
      <a href="https://supabase.io" target="_blank" rel="noopener noreferrer" className="text-gradient text-primary underline">
        Supabase
      </a>{" "}
      and{" "}
      <a href="https://openai.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">
        OpenAI
      </a>
    </div>
  );
}
