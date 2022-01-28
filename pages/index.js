import { NextSeo, } from "next-seo";
import DefaultLayout from "../components/DefaultLayout";
import {Heading1,} from "../components/layout/Typography";

export default function Home() {
  return (
      <DefaultLayout>
          <NextSeo
              title="Home"
              description="A short description goes here."
          />
          <Heading1>BachMacintosh</Heading1>
      </DefaultLayout>
  );
}
