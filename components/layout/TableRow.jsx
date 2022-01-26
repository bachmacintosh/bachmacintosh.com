export default function TableRow({index, children,}) {
    return(
        <tr className={index % 2 === 0 ? 'bg-blue-standard' : 'bg-blue-galaxy'}>
            {children}
        </tr>
    );
}