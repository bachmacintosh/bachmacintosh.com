import { ExternalLinkIcon, } from "@heroicons/react/outline";
import Link from "next/link";

export function ButtonLink ({ href, external, children, },) {
  const buttonClass = "bg-blue-ultra text-white active:bg-blue-diamond "
  + "font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md "
  + "outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all "
  + "duration-150";
  if (external === true) {
    return (
      <a className={buttonClass} type="button"
        href={href} target="_blank" rel="nofollow noreferrer noopener">
        {children}
        <ExternalLinkIcon className="w-3 h-3"/>
      </a>
    );
  } else {
    return (
      <Link href={href}>
        <a className={buttonClass} type="button">
          {children}
        </a>
      </Link>
    );
  }
}

export function NsfwButton () {
  return (
    <button className="bg-red-600 text-white font-bold
    px-4 py-2 rounded shadow mr-1 mb-1">Show NSFW Content</button>
  );
}

export function SpoilerButton () {
  return (
    <button className="bg-gray-600 text-white font-bold
    px-4 py-2 rounded shadow mr-1 mb-1">Show Spoiler Content</button>
  );
}

export function NsfwSpoilerButton () {
  return (
    <button className="bg-red-400 text-white font-bold
    px-4 py-2 rounded shadow mr-1 mb-1">Show NSFW Spoiler Content</button>
  );
}
