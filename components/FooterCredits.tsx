import Link from "next/link";
import React from "react";

export default function FooterCredits() {
  return (
    <footer className="flex w-full justify-center border-t-2 border-t-foreground/10 p-4 text-center text-base">
      <p className="text-text-secondary mr-2">Created by:</p>
      <div className="flex space-x-2">
        <Link
          href="https://github.com/matthewloh"
          target="_blank"
          className="text-text-primary font-semibold hover:underline"
          rel="noreferrer"
        >
          Matthew Loh Yet Marn,
        </Link>
        <Link
          href="https://github.com/MarcusO17"
          target="_blank"
          className="text-text-primary font-semibold hover:underline"
          rel="noreferrer"
        >
          Ong Ge Ye,
        </Link>
        <Link
          href="https://github.com/Vaneryn"
          target="_blank"
          className="text-text-primary font-semibold hover:underline"
          rel="noreferrer"
        >
          Thor Wen Zheng,
        </Link>
        <Link
          href="https://github.com/kelvinkyy"
          target="_blank"
          className="text-text-primary font-semibold hover:underline"
          rel="noreferrer"
        >
          Kee Yong Yik
        </Link>
      </div>
    </footer>
  );
}
