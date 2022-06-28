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
        Version
        {" "}
        <Hyperlink
          external={true}
          href="https://github.com/bachmacintosh/bachmacintosh.com/blob/main/CHANGELOG.md">
          {process.env.version}
        </Hyperlink> | Site last built on
        {` ${process.env.buildTime} ET`}
      </span>
    </>
  );
}
