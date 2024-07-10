import { Github } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center gap-16">
      <div className="flex items-center justify-center gap-8">
        <a
          href="https://github.com/matthewloh/5011cem-bff"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
        >
          <Github size={20} />
          <span className="font-mono text-xl">GitHub</span>
        </a>
        {/* <span className="border-l rotate-45 h-6" /> */}
      </div>
      <p className="mx-auto max-w-xl text-center text-3xl !leading-tight lg:text-4xl">
        Frontend + Backend Repository:{" "}
        <Link
          href="https://github.com/matthewloh/5011cem-bff"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          5011CEM
        </Link>{" "}
      </p>

      {/* Separator */}
      <div className="my-8 w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent p-[1px]" />
    </div>
  );
}
