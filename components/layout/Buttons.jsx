import { ExternalLinkIcon, } from "@heroicons/react/outline";
import Link from "next/link";

export function ButtonLink ({ href, external, children, },) {
  const buttonClass = "mx-1 my-4 w-full inline-flex items-center "
    + "justify-center px-5 py-3 border border-transparent text-base "
    + "font-medium rounded-md text-white bg-blue-ultra sm:w-auto";
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
    <button className={`mx-1 my-4 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 sm:w-auto`}>
      Show NSFW Content
    </button>
  );
}

export function NsfwButtonLink ({ href, external, children, },) {
  const buttonClass = "mx-1 my-4 w-full inline-flex items-center "
    + "justify-center px-5 py-3 border border-transparent text-base "
    + "font-medium rounded-md text-white bg-red-600 sm:w-auto";
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

export function SpoilerButton () {
  return (
    <button className={`mx-1 my-4 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 sm:w-auto`}>
      Show Spoiler Content
    </button>
  );
}

export function SpoilerButtonLink ({ href, external, children, },) {
  const buttonClass = "mx-1 my-4 w-full inline-flex items-center "
    + "justify-center px-5 py-3 border border-transparent text-base "
    + "font-medium rounded-md text-white bg-gray-600 sm:w-auto";
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

export function NsfwSpoilerButtonLink ({ href, external, children, },) {
  const buttonClass = "mx-1 my-4 w-full inline-flex items-center "
    + "justify-center px-5 py-3 border border-transparent text-base "
    + "font-medium rounded-md text-white bg-red-400 sm:w-auto";
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

export function NsfwSpoilerButton () {
  return (
    <button className={`mx-1 my-4 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-400 sm:w-auto`}
    >
      Show NSFW Spoiler Content
    </button>
  );
}
