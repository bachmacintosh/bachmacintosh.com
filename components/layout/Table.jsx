import TableHeader from "./TableHeader";

export default function Table({headers, children,}) {
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