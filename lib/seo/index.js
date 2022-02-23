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
      title: "BachMacintosh",
      // eslint-disable-next-line camelcase
      site_name: "BachMacintosh",
      url: process.env.baseUrl,
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

export function getPageSEO (title, description, router,) {
  return {
    title,
    description,
    canonical: process.env.baseUrl + router.asPath,
    twitter: {
      cardType: "summary",
      site: "@BachMacintosh",
      handle: "@BachMacintosh",
    },
    openGraph: {
      title,
      url: process.env.baseUrl + router.asPath,
    },
  };
}

export function getPageJsonLd (title, description, lastReviewed, router,) {
  return {
    id: process.env.baseUrl + router.asPath,
    description,
    lastReviewed,
    reviewedBy: {
      type: "Person",
      name: "Collin G. Bachman",
    },
  };
}
