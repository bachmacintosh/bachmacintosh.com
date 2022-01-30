export default function WanikaniSubject({subjectType, href, children,}) {
    let color = 'gray-500';
    if(subjectType === 'radical') {
        color = 'bg-wanikani-radical';
    } else if (subjectType === 'kanji') {
        color = 'bg-wanikani-kanji';
    } else if (subjectType === 'vocabulary') {
        color = 'bg-wanikani-vocabulary';
    }
    return(
        <div className={"w-auto mx-1 my-1 " + color}>
            <a className={"w-auto p-1 text-xs text-white hover:underline " + color} href={href} target="_blank" rel="nofollow noreferrer noopener">
                {children}
            </a>
        </div>
    );
}