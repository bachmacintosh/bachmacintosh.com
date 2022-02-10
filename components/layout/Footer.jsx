import { Hyperlink, } from "./Typography";
export default function Footer () {
  return (
    <>
      <hr className="border-blue-diamond" />
      <span id="footer" className="text-xs text-gray-400">
                        Copyright &copy;
        {new Date().getFullYear() > 2022 ? `2022-${new Date().getFullYear()}` : new Date().getFullYear()}
        {" "}
        Collin Bachman, a.k.a BachMacintosh |
        {" "}
        <Hyperlink href={"/privacy"} external={false}>Privacy</Hyperlink>
        <br />
        Version {process.env.NEXT_PUBLIC_APP_VERSION} | Site last updated on
        {` ${process.env.buildTime} ET`}
      </span>
    </>
  );
}
