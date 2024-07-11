import { Github } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <Link
          href="https://github.com/matthewloh/5011cem-bff"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-lg bg-gray-800 p-4 text-white hover:bg-gray-700"
        >
          <Github size={20} />
        </Link>
        <p className="mx-auto max-w-2xl text-center text-3xl !leading-tight lg:text-4xl">
          Frontend + Backend Repository:{" "}
          <Link
            href="https://github.com/matthewloh/5011cem-bff"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            5011CEM-BFF by Thor and Matthew
          </Link>{" "}
        </p>
      </div>
      <div className="my-8 w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent p-[1px]" />
      <div className="flex flex-col items-center justify-center gap-2">
        <Link
          href="https://github.com/MarcusO17/5011-cem-ml"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-lg bg-gray-800 p-4 text-white hover:bg-gray-700"
        >
          <Github size={20} />
        </Link>
        <p className="mx-auto max-w-2xl text-center text-3xl !leading-tight lg:text-4xl">
          Machine Learning + EDA Repository:{" "}
          <Link
            href="https://github.com/MarcusO17/5011-cem-ml"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            5011-CEM-ML by Marcus (Ong Ge Ye) and Kelvin (Kee Yong Yik)
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
