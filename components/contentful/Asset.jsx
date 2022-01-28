import Image from 'next/image';

export default function Asset({id, assets,}) {
    const asset = assets?.find((asset) => asset.sys.id === id);
    const contentfulLoader = ({ src, width, quality, }) => {
        return `${src}?w=${width}&q=${quality || 75}`;
    };
    if(asset?.width && asset?.height) {
        return(
            <figure>
                <Image loader={contentfulLoader} src={asset.url} alt={asset.description} width={asset.width} height={asset.height} />
                <figcaption className="text-gray-400 mb-3 text-sm indent-2">{asset.description}</figcaption>
            </figure>
        );
    }

    return null;
}