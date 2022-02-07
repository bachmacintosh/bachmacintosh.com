import Image from "next/image";

export default function AniListImage ({ src, alt, },) {
  return <div className="w-24 md:w-48 align-top">
    <Image
      src={src} alt={alt}
      width={200}
      height={300}
      unoptimized
    />
  </div>;
}
