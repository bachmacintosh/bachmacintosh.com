import Image from "next/image";
import type { ImageLoaderProps, } from "next/image";
import React from "react";
import type { ReactElement, } from "react";

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function CloudinaryImage (
  { src, alt, width, height, }: CloudinaryImageProps,
): ReactElement {
  return <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    loader={cloudinaryLoader}
  />;
}

function cloudinaryLoader (
  { src, width, quality, }: ImageLoaderProps,
): string {
  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality ?? "auto"}`,];
  const paramsString = `${params.join(",",)}/`;
  return `https://res.cloudinary.com/bachmacintosh/image/upload/${paramsString}${normalizeSrc(src,)}`;
}

function normalizeSrc (src: string,): string {
  return src.startsWith("/",) ? src.slice(1,) : src;
}
