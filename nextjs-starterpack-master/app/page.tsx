"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/atoms/Icons";

export default function Home() {
  {/* Kita ngoding di dalam sini */}
  return (
    <div className="flex flex-col items-center">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Mari kita&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>Ngoding&nbsp;</h1>
        <br />
        <h1 className={title()}>menggunakan </h1>
        <h1 className={title({ color: "blue" })}>Next.js </h1>
        <h1 className={title()}>dan </h1>
        <h1 className={title({ color: "cyan" })}>NextUI</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </h2>
      </div>

      <div className="flex gap-3 justify-center">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="flex justify-center mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </div>
  );
  {/* Kita ngoding di dalam sini */}
}
