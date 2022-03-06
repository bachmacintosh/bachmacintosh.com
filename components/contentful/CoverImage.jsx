import Image from "next/image";

export default function CoverImage ({ asset, },) {
  const contentfulLoader = ({ src, width, quality, },) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <Image
      src={asset.url}
      alt={asset.description}
      width={asset.width}
      height={asset.height}
      loader={contentfulLoader} />
  );
}
