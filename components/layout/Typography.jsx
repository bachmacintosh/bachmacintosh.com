import React, { createRef, useState, } from "react";
import { ExternalLinkIcon, } from "@heroicons/react/outline";
import Link from "next/link";
import { createPopper, } from "@popperjs/core";

const commonHeadingClasses = "text-blue-diamond font-bold break-words my-5";

export function PostTitle ({ children, },) {
  return <span className={`mx-auto text-2xl md:text-4xl ${commonHeadingClasses}`}>
    {children}
  </span>;
}

export function PostLede ({ children, },) {
  return <span className={`text-center text-lg md:text-2xl font-thin ${commonHeadingClasses}`}>
    {children}
  </span>;
}

export function Heading1 ({ children, },) {
  return <h1 className={`text-4xl md:text-6xl ${commonHeadingClasses}`}>{children}</h1>;
}

export function Heading2 ({ children, },) {
  return <h2 className={`text-3xl md:text-5xl ${commonHeadingClasses}`}>{children}</h2>;
}

export function Heading3 ({ children, },) {
  return <h3 className={`text-2xl md:text-4xl ${commonHeadingClasses}`}>{children}</h3>;
}

export function Heading4 ({ children, },) {
  return <h4 className={`text-xl md:text-3xl ${commonHeadingClasses}`}>{children}</h4>;
}

export function Heading5 ({ children, },) {
  return <h5 className={`text-lg md:text-2xl ${commonHeadingClasses}`}>{children}</h5>;
}

export function Heading6 ({ children, },) {
  return <h6 className={`md:text-xl ${commonHeadingClasses}`}>{children}</h6>;
}

export function Paragraph ({ indent, children, },) {
  return <p className={`text-sm md:text-base text-white mb-4 ${indent ? "indent-6" : ""}`}>{children}</p>;
}

export function BlockQuote ({ children, },) {
  return <blockquote
    className="border-l-8 border-blue-mariner pl-2">
    {children}
  </blockquote>;
}

export function Hyperlink ({ href, external, children, },) {
  if (external === true) {
    return <a
      className="text-blue-diamond hover:text-white underline"
      href={href}
      target="_blank"
      rel="nofollow noreferrer noopener">
      {children}<ExternalLinkIcon className="inline w-4 h-4" />
    </a>;
  } else {
    return <Link href={href}>
      <a className="text-blue-diamond hover:text-white underline">
        {children}
      </a>
    </Link>;
  }
}

export function TitleLink ({ href, meanings, children, },) {
  const [tooltipShow, setTooltipShow,] = useState(false,);
  const btnRef = createRef();
  const tooltipRef = createRef();

  const openLeftTooltip = () => {
    createPopper(btnRef.current, tooltipRef.current, { placement: "top", },);
    setTooltipShow(true,);
  };
  const closeLeftTooltip = () => {
    setTooltipShow(false,);
  };
  
  return <>
    <div className="flex flex-wrap">
      <div className="text-center">
        <a className={`font-bold text-xl md:text-3xl hover:underline hover:underline-offset-2 px-1 py-1 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
          type="button"
          onMouseEnter={openLeftTooltip}
          onMouseLeave={closeLeftTooltip}
          ref={btnRef}
          href={href} target="_blank" rel="nofollow noreferrer noopener"
          style={{ fontFamily: "Noto Sans JP", }}
        >
          {children}
        </a>
        <div
          className={`${tooltipShow ? "" : "hidden "}h-auto border-0 inline z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words`}
          ref={tooltipRef}
        >
          <div>
            <div className="text-white p-3 bg-gray-500">
              {meanings}
            </div>
          </div>
          <div className="w-0 h-0 border-4 border-transparent" />
        </div>
      </div>
    </div>
  </>;
}

export function SpoilerWarning ({ spoilerName, },) {
  return <>
    <span
      className={"text-center text-lg md:text-2xl font-thin"
        + " text-orange-300 break-words my-5"}>
      {`Note: ${spoilerName} Spoilers Ahead!`}
    </span>
    <Paragraph indent={false}>
      I recommend not clicking this button if you are not caught up
      {" "}
      yet.
    </Paragraph>
  </>;
}

export function NsfwWarning () {
  return <>
    <span
      className={"text-center text-lg md:text-2xl font-thin"
        + " text-red-300 break-words my-5"}>
      {`Warning: Post Is Not Safe For Work!`}
    </span>
    <Paragraph indent={false}>
      No pornography, but you probably should avoid this at the
      {" "}
      office.
    </Paragraph>
  </>;
}

export function UnorderedList ({ children, },) {
  return <ul className="list-disc text-white ml-11">{children}</ul>;
}

export function OrderedList ({ children, },) {
  return <ol className="list-decimal text-white ml-6">{children}</ol>;
}

export function ListItem ({ children, },) {
  return <li>{children}</li>;
}

export function ErrorCode ({ children, },) {
  return <span
    className="block text-8xl md:text-9xl my-6 text-orange-300 font-bold
    text-center">
    { children }
  </span>;
}
