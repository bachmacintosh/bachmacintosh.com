import {ExternalLinkIcon,} from "@heroicons/react/outline";

const commonHeadingClasses = 'text-blue-diamond font-bold break-words my-5';

export function Heading1({children,}) {
    return(<h1 className={`text-4xl md:text-6xl ${commonHeadingClasses}`}>{children}</h1>);
}

export function Heading2({children,}) {
    return(<h2 className={`text-3xl md:text-5xl ${commonHeadingClasses}`}>{children}</h2>);
}

export function Heading3({children,}) {
    return(<h3 className={`text-2xl md:text-4xl ${commonHeadingClasses}`}>{children}</h3>);
}

export function Heading4({children,}) {
    return(<h4 className={`text-xl md:text-3xl ${commonHeadingClasses}`}>{children}</h4>);
}

export function Heading5({children,}) {
    return(<h5 className={`text-lg md:text-2xl ${commonHeadingClasses}`}>{children}</h5>);
}

export function Heading6({children,}) {
    return(<h6 className={`md:text-xl ${commonHeadingClasses}`}>{children}</h6>);
}

export function Paragraph({noIndent, children,}) {
    return(<p className={'text-sm md:text-base text-white mb-4 ' + (!noIndent ? 'indent-6' : '')}>{children}</p>);
}

export function BlockQuote({children,}) {
    return(<blockquote className="border-l-8 border-blue-mariner pl-2">{children}</blockquote>);
}

export function Hyperlink({href, type, children,}) {
    if(type === 'external') {
        return(<a className="flex flex-row align-middle text-blue-diamond hover:text-white underline" href={href} target="_blank" rel="nofollow noreferrer noopener">{children}
            <ExternalLinkIcon className="w-4 h-4 mt-1.5" /></a> );
    }
}

export function UnorderedList({children,}) {
    return(<ul className="list-disc text-white ml-10">{children}</ul> );
}

export function OrderedList({children,}) {
    return(<ol className="list-decimal text-white ml-10">{children}</ol> );
}

export function ListItem({children,}) {
    return(<li>{children}</li>);
}