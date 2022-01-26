export function Table({headers, children,}) {
    return(
        <div className="flex flex-col">
            <div className="-mt-2 mb-5 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-blue-diamond">
                        <table className="min-w-full divide-y divide-blue-diamond border-b border-blue-diamond">
                            <thead className="bg-blue-ultra">
                            <tr>
                                {headers.map(function(h) {
                                    return(<TableHeader key={h}>{h}</TableHeader>);
                                })}
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

export function TableHeader({children,}) {
    return(
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
        >
            {children}
        </th>
    );
}

export function TableRow({index, children,}) {
    return(
        <tr className={index % 2 === 0 ? 'bg-blue-standard' : 'bg-blue-galaxy'}>
            {children}
        </tr>
    );
}

export function TableColumn({children,}) {
    return(
        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-diamond">{children}</td>
    );
}