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

export function Paragraph({children,}) {
    return(<p className="text-sm md:text-base text-white pb-4 indent-6">{children}</p>);
}