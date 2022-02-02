export function Table({ headers, children, },) {
    return(
        <div className="flex flex-col">
            <div className="-mt-2 mb-5 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-blue-diamond">
                        <table className="table-auto min-w-full divide-y divide-blue-diamond border-b border-blue-diamond">
                            <thead className="bg-blue-ultra">
                            <tr>
                                {headers.map((header,) => (<TableHeader key={header}>{header}</TableHeader>),)}
                            </tr>
                            </thead>
                            <tbody>
                            {children}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function TableHeader({ children, },) {
    return(
        <th scope="col" className="px-6 py-3 text-left text-xs md:text-base font-medium text-white uppercase tracking-wider"
        >
            {children}
        </th>
    );
}

export function TableRow({ index, children, },) {
    return(
        <tr className={(index % 2 === 0 ? 'bg-blue-standard' : 'bg-blue-galaxy')}>
            {children}
        </tr>
    );
}

export function TableColumn({ rowSpan, colSpan, children, },) {
    return(
        <td className="px-6 py-4 text-sm text-blue-diamond break-words border-b border-blue-diamond" rowSpan={rowSpan ? rowSpan : 1} colSpan={colSpan ? colSpan: 1} >{children}</td>
    );
}