import {NextSeo,} from "next-seo";
import {getGtaSheets,} from "../../lib/google/sheets";
import DefaultLayout from "../../components/DefaultLayout";
import {Table, TableRow, TableColumn,} from "../../components/layout/Table";

export default function GtaOnline({content,}) {
    return(
        <DefaultLayout>
            <NextSeo
                title="GTA Online"
                description="Never a dull moment in the wonderful city of Los antos"
            />
            <h1>GTA Online</h1>
            <h2>Money Breakdown</h2>
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
            <h2>The Grind</h2>
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