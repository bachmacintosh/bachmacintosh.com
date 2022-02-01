import React from 'react';
import {NextSeo,} from "next-seo";
import {getGtaSheets,} from "../../lib/google/sheets";
import DefaultLayout from "../../components/DefaultLayout";
import { Disclosure, } from "@headlessui/react";
import {Table, TableRow, TableColumn,} from "../../components/layout/Table";
import {Heading1, Heading2, Heading3, Paragraph,} from "../../components/layout/Typography";
import {SmallButtonLink,} from "../../components/layout/Buttons";
import {ExternalLinkIcon,} from "@heroicons/react/outline";

export default function GtaOnline({content,},) {
    return(
        <>
            <NextSeo
                title="GTA Online"
                description="Never a dull moment in the wonderful city of Los Santos"
            />
            <Heading1>GTA Online</Heading1>
            <Disclosure defaultOpen="open">
                {({open,},) => (
                    <>
                        <Disclosure.Button>
                            <Heading2>[{open ? '-': '+'}] Summary</Heading2>
                        </Disclosure.Button>
                        <Disclosure.Panel>
                            <Paragraph noIndent={true}>Here is a quick overview of my GTA online account and its current financial situation.
                            </Paragraph>
                            <Heading3>Money Breakdown</Heading3>
                            <Table headers={['Name', 'GTA Dollars', 'Shark Card USD',]}>
                                {content.summary.map((s, i,) => (
                                    s.summaryType === 'Money' && (
                                        <TableRow key={s.title} index={i}>
                                            <TableColumn>
                                                <span className="font-bold">{s.title}</span>
                                            </TableColumn>
                                            <TableColumn>{s.gtaDollars}</TableColumn>
                                            <TableColumn>{s.sharkCardUsd}</TableColumn>
                                        </TableRow>
                                    )
                                ),)}
                            </Table>
                            <Heading3>The Grind</Heading3>
                            <Table headers={['Name', 'Value',]}>
                                {content.summary.map((s, i,) => (
                                    s.summaryType === 'Grind' && (
                                        <TableRow key={s.title} index={i}>
                                            <TableColumn>
                                                <span className="font-bold">{s.title}</span>
                                            </TableColumn>
                                            <TableColumn>{s.gtaDollars}</TableColumn>
                                        </TableRow>
                                    )
                                ),)}
                            </Table>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <br/>
            <Disclosure>
                {({open,},) => (
                    <>
                        <Disclosure.Button>
                            <Heading2>[{open ? '-': '+'}] Wish List</Heading2>
                        </Disclosure.Button>
                        <Disclosure.Panel>
                            <Paragraph noIndent={true}>This is a list of all the things I want to buy in GTA Online. If something has a zero time/money remaining, it means I have enough GTA$ to buy it, but am waiting for a sale or am otherwise putting it off until my grinding is done (see Summary tab).</Paragraph>
                            <Table headers={['Item', 'Buy At', '', 'Total', 'Remaining',]}>
                                {content.wishList.map((w,i,) => (
                                    <React.Fragment key={i}>
                                        <TableRow index={i}>
                                            <TableColumn rowSpan="2">{w.item}</TableColumn>
                                            <TableColumn rowSpan="2">{w.buyAt}</TableColumn>
                                            <TableColumn><span className="font-bold">Cost</span> </TableColumn>
                                            <TableColumn>{w.cost}</TableColumn>
                                            <TableColumn>{w.moneyToGrind.charAt(0,) === '-' ? '$0' : w.moneyToGrind}</TableColumn>
                                        </TableRow>
                                        <TableRow index={i}>
                                            <TableColumn><span className="font-bold">Grind Days</span></TableColumn>
                                            <TableColumn>{w.totalGrindDays}</TableColumn>
                                            <TableColumn>{w.daysToGrind.charAt(0,) === '-' ? '0' : w.daysToGrind}</TableColumn>
                                        </TableRow>
                                    </React.Fragment>
                                ),)}
                            </Table>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <br />
            <Disclosure>
                {({open,},) => (
                    <>
                        <Disclosure.Button>
                            <Heading2>[{open ? '-': '+'}] Earnings</Heading2>
                        </Disclosure.Button>
                        <Disclosure.Panel>
                            <Paragraph>This is a log of year-to-date earnings in GTA.</Paragraph>
                            <Table headers={['Date', 'Balance', 'Earnings',]}>
                                {content.earnings.map((e, i,) => (
                                    <TableRow key={e.balanceDate} index={i}>
                                        <TableColumn>{e.balanceDate}</TableColumn>
                                        <TableColumn>{e.balance}</TableColumn>
                                        <TableColumn>
                                            <span className={e.earnings.charAt(0,) === '-' ? 'text-orange-300' : 'text-blue-diamond'}>
                                            {e.earnings}
                                            </span>
                                        </TableColumn>
                                    </TableRow>
                                ),)}
                            </Table>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <br />
            <Disclosure>
                {({open,},) => (
                    <>
                        <Disclosure.Button>
                            <Heading2>[{open ? '-': '+'}] Properties</Heading2>
                        </Disclosure.Button>
                        <Disclosure.Panel>
                            <Paragraph noIndent={true}>These are all the properties I own in the game and their worth.</Paragraph>
                            {content.properties.map((p,) => (
                                <React.Fragment key={p.propertyType}>
                                    <Heading3>{p.propertyType}</Heading3>
                                    <Table headers={['Name', 'Location', 'Cost',]}>
                                        {p.items.map((item, i,) => (
                                            <React.Fragment key={i}>
                                                <TableRow index={i}>
                                                    <TableColumn rowSpan="2">{item.propertyName}</TableColumn>
                                                    <TableColumn>{item.location}</TableColumn>
                                                    <TableColumn>{item.cost}</TableColumn>
                                                </TableRow>
                                                <TableRow index={i}>
                                                    <TableColumn colSpan="2">
                                                        <SmallButtonLink href={item.gtaWikiLink}>GTA Wiki<ExternalLinkIcon className="w-3 h-3"/></SmallButtonLink>
                                                        <SmallButtonLink href={item.gtaBaseLink}>GTA Base<ExternalLinkIcon className="w-3 h-3"/></SmallButtonLink>
                                                    </TableColumn>
                                                </TableRow>
                                            </React.Fragment>
                                        ),)}
                                    </Table>
                                </React.Fragment>
                            ),)}
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <br />
            <Disclosure>
                {({open,},) => (
                    <>
                        <Disclosure.Button>
                            <Heading2>[{open ? '-': '+'}] Vehicles</Heading2>
                        </Disclosure.Button>
                        <Disclosure.Panel>
                            <Paragraph noIndent={true}>These are all the vehicles I own in the game and their worth.</Paragraph>
                            {content.vehicles.map((v,) => (
                                <React.Fragment key={v.location}>
                                    <Heading3>{v.location}</Heading3>
                                    <Table headers={['Floor', 'Name', 'Cost',]}>
                                        {v.items.map((item, i,) => (
                                            <React.Fragment key={i}>
                                                <TableRow index={i}>
                                                    <TableColumn rowSpan="2">{item.floor}</TableColumn>
                                                    <TableColumn>{item.vehicleName}</TableColumn>
                                                    <TableColumn>{item.cost}</TableColumn>
                                                </TableRow>
                                                <TableRow index={i}>
                                                    <TableColumn colSpan="2">
                                                        <SmallButtonLink href={item.gtaWikiLink}>GTA Wiki<ExternalLinkIcon className="w-3 h-3"/></SmallButtonLink>
                                                        <SmallButtonLink href={item.gtaBaseLink}>GTA Base<ExternalLinkIcon className="w-3 h-3"/></SmallButtonLink>
                                                    </TableColumn>
                                                </TableRow>
                                            </React.Fragment>
                                        ),)}
                                    </Table>
                                </React.Fragment>
                            ),)}
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <br />
            <Disclosure>
                {({open,},) => (
                    <>
                        <Disclosure.Button>
                            <Heading2>[{open ? '-': '+'}] Safes</Heading2>
                        </Disclosure.Button>
                        <Disclosure.Panel>
                            <Paragraph>This is a list of Safes that generate GTA Dollars as the game idles..</Paragraph>
                            <Table headers={['Location', 'Safe Capacity', 'Money / In-Game Day', 'Money / 24 Hrs.', 'Days to Fill',]}>
                                {content.safes.map((s, i,) => (
                                    <TableRow key={s.location} index={i}>
                                        <TableColumn>{s.location}</TableColumn>
                                        <TableColumn>{s.safeCapacity}</TableColumn>
                                        <TableColumn>{s.moneyPerIgDay}</TableColumn>
                                        <TableColumn>{s.moneyPer24Hours}</TableColumn>
                                        <TableColumn>{s.daysToFill}</TableColumn>
                                    </TableRow>
                                ),)}
                            </Table>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    );
}

GtaOnline.getLayout = function getLayout(page,) {
    return(
        <DefaultLayout>
            {page}
        </DefaultLayout>
    );
};

export async function getStaticProps() {
    const content = await getGtaSheets();

    return {
        props: {
            content: content,
        },
    };
}