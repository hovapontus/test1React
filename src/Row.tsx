interface RowData {
    id: number;
    label: string;
}

interface RowProps {
    rowData: RowData;
    onSelectRow: (id: number) => void;
    onDeleteRow: (id: number) => void;
}

export function Row({ rowData, onSelectRow, onDeleteRow }: RowProps) {
    return (
        <tr>
            <td className="col-md-1">{rowData.id}</td>
            <td className="col-md-4">
                <a onClick={() => onSelectRow(rowData.id)}>{rowData.label}</a>
            </td>
            <td className="col-md-1">
                <a onClick={() => onDeleteRow(rowData.id)}>❌</a>
            </td>
            <td className="col-md-6"></td>
        </tr>
    );
}