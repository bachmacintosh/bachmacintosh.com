import {NextSeo,} from "next-seo";
import {getGtaSheets,} from "../../lib/google/sheets";
import DefaultLayout from "../../components/DefaultLayout";
import {Table, TableRow, TableColumn,} from "../../components/layout/Table";
import {Heading1, Heading2,} from "../../components/layout/Typography";

export default function GtaOnline({content,}) {
    return(
        <DefaultLayout>
            <NextSeo
                title="GTA Online"
                description="Never a dull moment in the wonderful city of Los antos"
            />
            <Heading1>GTA Online</Heading1>
            <Heading2>Money Breakdown</Heading2>
            <Table headers={['Name', 'GTA Dollars', 'Shark Card USD',]}>
                {content.summary.map((s, i) => (
                    s.summaryType === 'Money' && (
                        <TableRow key={s.title} index={i}>
                            <TableColumn>
                                <span className="font-bold">{s.title}</span>
                            </TableColumn>
                            <TableColumn>{s.gtaDollars}</TableColumn>
                            <TableColumn>{s.sharkCardUsd}</TableColumn>
                        </TableRow>
                    )
                ))}
            </Table>
            <Heading2>The Grind</Heading2>
            <Table headers={['Name', 'Value',]}>
                {content.summary.map((s, i) => (
                    s.summaryType === 'Grind' && (
                        <TableRow key={s.title} index={i}>
                            <TableColumn>
                                <span className="font-bold">{s.title}</span>
                            </TableColumn>
                            <TableColumn>{s.gtaDollars}</TableColumn>
                        </TableRow>
                    )
                ))}
            </Table>
        </DefaultLayout>
    );
}

export async function getStaticProps() {
    const content = await getGtaSheets();

    return {
        props: {
            content: content,
        },
    };
}