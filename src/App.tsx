import { useState, useEffect, useRef } from 'react';
import { Row } from './Row';

const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
const colors = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
const contents = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];

interface RowData {
    id: number;
    label: string;
}

export function App() {
    const [rows, setRows] = useState<RowData[]>([]);
    const nextId = useRef(1);
    const renderStartTime = useRef(0);

    const generateRandomLabel = () => {
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const content = contents[Math.floor(Math.random() * contents.length)];
        return `${adjective} ${color} ${content}`;
    };

    const createRows = (count: number) => {
        const newRows: RowData[] = [];
        for (let i = 0; i < count; i++) {
            newRows.push({ id: nextId.current++, label: generateRandomLabel() });
        }
        startTiming();
        setRows(newRows);
    };

    const createThousandRows = () => createRows(1000);
    const createTenThousandRows = () => createRows(10000);

    const appendThousandRows = () => {
        startTiming();
        setRows(prevRows => {
            const newRows = [...prevRows];
            for (let i = 0; i < 1000; i++) {
                newRows.push({ id: nextId.current++, label: generateRandomLabel() });
            }
            return newRows;
        });
    };

    const updateEveryTenthRow = () => {
        startTiming();
        setRows(prevRows => {
            return prevRows.map((row, index) => {
                if (index % 10 === 0) {
                    return { ...row, label: row.label + " !!!" };
                }
                return row;
            });
        });
    };

    const clearRows = () => {
        startTiming();
        setRows([]);
        nextId.current = 1;
    };

    const swapRows = () => {
        if (rows.length > 998) {
            startTiming();
            setRows(prevRows => {
                const newRows = [...prevRows];
                const row1 = newRows[1];
                const row998 = newRows[998];
                newRows[1] = row998;
                newRows[998] = row1;
                return newRows;
            });
        }
    };

    const selectRow = (id: number) => {
        console.log(`Row selected: ${id}`);
    };

    const deleteRow = (id: number) => {
        startTiming();
        setRows(prevRows => prevRows.filter(row => row.id !== id));
    };

    const startTiming = () => {
        renderStartTime.current = performance.now();
    };

    useEffect(() => {
        const measureRenderTime = () => {
            if (renderStartTime.current) {
                const renderTime = performance.now() - renderStartTime.current;
                console.log(`[Performance.now] Render time: ${renderTime.toFixed(2)} ms`);
                renderStartTime.current = 0;
            }
        };

        requestAnimationFrame(measureRenderTime);
    });

    return (
        <div>
            <button onClick={createThousandRows}>Create 1,000 rows</button>
            <button onClick={createTenThousandRows}>Create 10,000 rows</button>
            <button onClick={appendThousandRows}>Append 1,000 rows</button>
            <button onClick={updateEveryTenthRow}>Update every 10th row</button>
            <button onClick={clearRows}>Clear</button>
            <button onClick={swapRows}>Swap Rows</button>

            <table className="table table-hover table-striped test-data">
                <tbody>
                    {rows.map(row => (
                        <Row 
                            key={row.id}
                            rowData={row}
                            onSelectRow={selectRow}
                            onDeleteRow={deleteRow}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}