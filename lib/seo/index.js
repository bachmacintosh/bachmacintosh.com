export function getDefaultSeo () {
  return {
    titleTemplate: "%s | BachMacintosh",
    defaultTitle: "BachMacintosh",
    twitter: {
      cardType: "summary",
      site: "@BachMacintosh",
      handle: "@BachMacintosh",
    },
    openGraph: {
      type: "website",
      url: "https://bachmacintosh.com",
      images: [
        {
          url: "https://images.ctfassets.net/kv526tbd0cl9/5dATXnPIZ9cP6EhlClNenX/bf3a70ca5dade5c4e36dc7c08d3f699a/discord_icon.png?w=256&h=256",
          width: 256,
          height: 256,
          alt: "BachMacintosh.com",
        },
      ],
    },
  };
}
