import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import {
  Heading1, Heading2, Heading3,
  Paragraph,
} from "../../components/layout/Typography";
import { Table, TableColumn, TableRow, } from "../../components/layout/Table";
import { ButtonLink, } from "../../components/layout/Buttons";
import DefaultView from "../../components/views/DefaultView";
import { Disclosure, } from "@headlessui/react";
import React from "react";
import { getGtaSheets, } from "../../lib/google/sheets";
import { getPageSEO, } from "../../lib/seo";
import { useRouter, } from "next/router";

export default function GtaOnline ({ content, },) {
  const title = "GTA Online";
  const description = "BachMacintosh in the wonderful city of Los Santos";
  const router = useRouter();
  const breadcrumbs = [
    {
      position: 1,
      name: "BachMacintosh",
      item: process.env.baseUrl,
    },
    {
      position: 2,
      name: "Gaming",
      item: `${process.env.baseUrl}/gaming`,
    },
    {
      position: 3,
      name: title,
      item: process.env.baseUrl + router.asPath,
    },
  ];
  return (
    <>
      <NextSeo {...getPageSEO(title, description, router,)} />
      <BreadcrumbJsonLd itemListElements={breadcrumbs} />
      <Heading1>GTA Online</Heading1>
      <Disclosure defaultOpen="open">
        {({ open, },) => {
          return <>
            <Disclosure.Button>
              <Heading2>[{open ? "-" : "+"}] Summary</Heading2>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph noIndent={true}>
                Here is a quick overview of my GTA online account and its
                {` `}
                current financial situation.
              </Paragraph>
              <Heading3>Money Breakdown</Heading3>
              <Table headers={["Name", "GTA Dollars", "Shark Card USD",]}>
                {content.summary.map((row, index,) => {
                  return row.summaryType === "Money"
                    && <TableRow key={row.title} index={index}>
                      <TableColumn>
                        <span className="font-bold">{row.title}</span>
                      </TableColumn>
                      <TableColumn>{row.gtaDollars}</TableColumn>
                      <TableColumn>{row.sharkCardUsd}</TableColumn>
                    </TableRow>;
                }

                  ,)}
              </Table>
              <Heading3>The Grind</Heading3>
              <Table headers={["Name", "Value",]}>
                {content.summary.map((row, index,) => {
                  return row.summaryType === "Grind"
                    && <TableRow key={row.title} index={index}>
                      <TableColumn>
                        <span className="font-bold">{row.title}</span>
                      </TableColumn>
                      <TableColumn>{row.gtaDollars}</TableColumn>
                    </TableRow>;
                }

                  ,)}
              </Table>
            </Disclosure.Panel>
          </>;
        }
        }
      </Disclosure>
      <hr />
      <Disclosure>
        {({ open, },) => {
          return <>
            <Disclosure.Button>
              <Heading2>[{open ? "-" : "+"}] Wish List</Heading2>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph noIndent={true}>
                This is a list of all the things I want to buy in GTA Online. If
                {` `}
                something has a zero time/money remaining, it means I have
                {` `}
                enough GTA$ to buy it, but am waiting for a sale or am otherwise
                {` `}
                putting it off until my grinding is done (see Summary tab).
              </Paragraph>
              <Table headers={["Item", "Buy At", "", "Total", "Remaining",]}>
                {content.wishList.map((row,index,) => {
                  return <React.Fragment key={index}>
                    <TableRow index={index}>
                      <TableColumn rowSpan="2">{row.item}</TableColumn>
                      <TableColumn rowSpan="2">{row.buyAt}</TableColumn>
                      <TableColumn>
                        <span className="font-bold">Cost</span>
                      </TableColumn>
                      <TableColumn>{row.cost}</TableColumn>
                      <TableColumn>
                        {
                          row.moneyToGrind.charAt(0,) === "-"
                            ? "$0"
                            : row.moneyToGrind
                        }
                      </TableColumn>
                    </TableRow>
                    <TableRow index={index}>
                      <TableColumn>
                        <span className="font-bold">
                          Grind Days
                        </span>
                      </TableColumn>
                      <TableColumn>{row.totalGrindDays}</TableColumn>
                      <TableColumn>
                        {row.daysToGrind.charAt(0,) === "-"
                          ? "0"
                          : row.daysToGrind}
                      </TableColumn>
                    </TableRow>
                  </React.Fragment>;
                }
                  ,)}
              </Table>
            </Disclosure.Panel>
          </>;
        }
        }
      </Disclosure>
      <hr />
      <Disclosure>
        {({ open, },) => {
          return <>
            <Disclosure.Button>
              <Heading2>[{open ? "-" : "+"}] Earnings</Heading2>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph>
                This is a log of year-to-date earnings in GTA.
              </Paragraph>
              <Table headers={["Date", "Balance", "Earnings",]}>
                {content.earnings.map((row, index,) => {
                  return <TableRow key={row.balanceDate} index={index}>
                    <TableColumn>{row.balanceDate}</TableColumn>
                    <TableColumn>{row.balance}</TableColumn>
                    <TableColumn>
                      <span
                        className={row.earnings.charAt(0,) === "-"
                          ? "text-orange-300"
                          : "text-blue-diamond"}>
                        {row.earnings}
                      </span>
                    </TableColumn>
                  </TableRow>;
                }
                  ,)}
              </Table>
            </Disclosure.Panel>
          </>;
        }
        }
      </Disclosure>
      <hr />
      <Disclosure>
        {({ open, },) => {
          return <>
            <Disclosure.Button>
              <Heading2>[{open ? "-" : "+"}] Properties</Heading2>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph noIndent={true}>
                These are all the properties I own in the game and their worth.
              </Paragraph>
              {content.properties.map((group,) => {
                return <React.Fragment key={group.propertyType}>
                  <Heading3>{group.propertyType}</Heading3>
                  <Table headers={["Name", "Location", "Cost",]}>
                    {group.items.map((row, index,) => {
                      return <React.Fragment key={index}>
                        <TableRow index={index}>
                          <TableColumn
                            rowSpan="2">
                            {row.propertyName}
                          </TableColumn>
                          <TableColumn>{row.location}</TableColumn>
                          <TableColumn>{row.cost}</TableColumn>
                        </TableRow>
                        <TableRow index={index}>
                          <TableColumn colSpan="2">
                            <ButtonLink
                              href={row.gtaWikiLink}
                              external={true}
                            >
                              GTA Wiki
                            </ButtonLink>
                            <ButtonLink
                              href={row.gtaBaseLink}
                              external={true}
                            >
                              GTA Base
                            </ButtonLink>
                          </TableColumn>
                        </TableRow>
                      </React.Fragment>;
                    }
                      ,)}
                  </Table>
                </React.Fragment>;
              }
                ,)}
            </Disclosure.Panel>
          </>;
        }
        }
      </Disclosure>
      <hr />
      <Disclosure>
        {({ open, },) => {
          return <>
            <Disclosure.Button>
              <Heading2>[{open ? "-" : "+"}] Vehicles</Heading2>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph noIndent={true}>
                These are all the vehicles I own in the game and their worth.
              </Paragraph>
              {content.vehicles.map((group,) => {
                return <React.Fragment key={group.location}>
                  <Heading3>{group.location}</Heading3>
                  <Table headers={["Floor", "Name", "Cost",]}>
                    {group.items.map((row, index,) => {
                      return <React.Fragment key={index}>
                        <TableRow index={index}>
                          <TableColumn rowSpan="2">{row.floor}</TableColumn>
                          <TableColumn>{row.vehicleName}</TableColumn>
                          <TableColumn>{row.cost}</TableColumn>
                        </TableRow>
                        <TableRow index={index}>
                          <TableColumn colSpan="2">
                            <ButtonLink
                              href={row.gtaWikiLink}
                              external={true}
                            >
                              GTA Wiki
                            </ButtonLink>
                            <ButtonLink
                              href={row.gtaBaseLink}
                              external={true}
                            >
                              GTA Base
                            </ButtonLink>
                          </TableColumn>
                        </TableRow>
                      </React.Fragment>;
                    }
                      ,)}
                  </Table>
                </React.Fragment>;
              }
                ,)}
            </Disclosure.Panel>
          </>;
        }
        }
      </Disclosure>
      <hr />
      <Disclosure>
        {({ open, },) => {
          return <>
            <Disclosure.Button>
              <Heading2>[{open ? "-" : "+"}] Safes</Heading2>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph>
                This is a list of Safes that generate GTA Dollars as the game
                {" "}
                idles.
              </Paragraph>
              <Table headers={[
                "Location",
                "Safe Capacity",
                "Money / In-Game Day",
                "Money / 24 Hrs.",
                "Days to Fill",
              ]}>
                {content.safes.map((row, index,) => {
                  return <TableRow key={row.location} index={index}>
                    <TableColumn>{row.location}</TableColumn>
                    <TableColumn>{row.safeCapacity}</TableColumn>
                    <TableColumn>{row.moneyPerIgDay}</TableColumn>
                    <TableColumn>{row.moneyPer24Hours}</TableColumn>
                    <TableColumn>{row.daysToFill}</TableColumn>
                  </TableRow>;
                }
                  ,)}
              </Table>
            </Disclosure.Panel>
          </>;
        }
        }
      </Disclosure>
    </>
  );
}

GtaOnline.getView = function getView (page,) {
  return (
    <DefaultView>
      {page}
    </DefaultView>
  );
};

export async function getStaticProps () {
  const content = await getGtaSheets();

  return { props: { content, }, };
}
