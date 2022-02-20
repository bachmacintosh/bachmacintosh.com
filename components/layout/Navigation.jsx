import { MenuIcon, XIcon, } from "@heroicons/react/outline";
import { Disclosure, } from "@headlessui/react";
import Link from "next/link";
import React from "react";
import { useRouter, } from "next/router";

function classNames (...classes) {
  return classes.filter(Boolean,).join(" ",);
}

const navigation = [
  { name: "Home", basePath: "/", href: "/", },
  { name: "Gaming", basePath: "gaming", href: "/gaming", },
  { name: "JPN", basePath: "jpn", href: "/jpn", },
];

const MobileLink = React.forwardRef(({ item, basePath, }, ref,) => {
  MobileLink.displayName = "MobileLink";
  return <Link href={item.href} passHref>
    <MobileAnchor basePath={basePath} item={item} ref={ref} />
  </Link>;
},);

const MobileAnchor = React.forwardRef(
  ({ item, basePath, onClick, href, }, ref,) => {
    MobileAnchor.displayName = "MobileAnchor";
    return (
      <a
        className={classNames(
          item.basePath === basePath
            ? "bg-blue-standard text-white"
            : "text-blue-diamond hover:bg-blue-racing"
          + "hover:text-white",
          "block px-3 py-2 rounded-md text-base font-medium",
        )}
        aria-current={item.basePath === basePath ? "page" : null}
        href={href}
        ref={ref}
        onClick={onClick}
      >
        {item.name}
      </a>
    );
  },);

export default function Navigation () {
  const router = useRouter();
  const basePath = router.asPath === "/" ? "/" : router.asPath.split("/",)[1];
  return (
    <Disclosure as="nav" className="bg-blue-racing fixed w-full z-10">
      {({ open, },) => {
        return <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center
              md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center
                justify-center p-2 rounded-md text-blue-diamond hover:text-white
                hover:bg-blue-standard focus:outline-none focus:ring-2
                focus:ring-inset focus:ring-blue-diamond">
                  <span className="sr-only">Open main menu</span>
                  {open
                    ? <XIcon className="block h-6 w-6" aria-hidden="true" />
                    : <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  }
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center
              md:items-stretch md:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-blue-diamond rounded-md text-lg
                  font-bold uppercase">
                    BachMacintosh
                  </span>
                </div>
                <div className="hidden md:block md:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item,) => {
                      return <Link key={item.name} href={item.href}>
                        <a
                          key={item.name}
                          className={classNames(
                            item.basePath === basePath
                              ? "bg-blue-standard text-white"
                              : "text-blue-diamond hover:bg-blue-standard "
                              + "hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium",
                          )}
                          aria-current={item.basePath === basePath
                            ? "page"
                            : null}
                        >
                          {item.name}
                        </a>
                      </Link>;
                    }
                      ,)}
                  </div>
                </div>
              </div>

            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item,) => {
                return (
                  <Disclosure.Button
                    key={item.name}
                    as={MobileLink}
                    item={item}
                    basePath={basePath}
                  />);
              }
                ,)}
            </div>
          </Disclosure.Panel>
        </>;
      }
      }
    </Disclosure>
  );
}
