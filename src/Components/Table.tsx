import React from 'react';
import "./TableStyles.scss";

type TableProps = {
    title: string,
    rowCount: number,
    columnsCount: number,
    cellStyles?: (rowIndex: number, colIndex: number) => any,
    cellClassName?: (rowIndex: number, colIndex: number) => string;
    fetchData: (rowIndex: number, colIndex: number) => React.ReactNode;
}

const styles = {
    cell: {
        backgroundColor: 'rgba(0, 157, 254, 0.24)',
        borderRadius: '5px',
        border: 'solid 1px rgba(0, 157, 254, 0.24)',
        textAlign: 'center',
        height: '25px',
        width: '50px',
    },
    tableHeaderCell: {
        height: '20px',
        backgroundColor: 'rgba(0, 157, 254, 0.24)',
        color: 'black',
        borderRadius: '5px',    
    },
    table: {
        border: '3px solid rgba(0, 157, 254, 0.24)',
        'emptycells': 'hide',
    }
};

function Table (props: TableProps) {
    const cols = (rowIndex: number) => {
        let columns = [];
        for(let colIndex = 0; colIndex < props.columnsCount; colIndex++) {
            let value = props.fetchData(rowIndex, colIndex);
            let newStyles = props.cellStyles ? 
                {...styles.cell, ...props.cellStyles(rowIndex, colIndex)}
                : styles.cell; 
            columns.push(<td role="column" key={colIndex} style={newStyles} className={props.cellClassName ? props.cellClassName(rowIndex, colIndex) : ""}>
                {value}
            </td>);
        }
        return columns;
    }

    const rows = () => {
        const rowArray = [];
        for(let rIndex = 0; rIndex < props.rowCount; rIndex++) {
            rowArray.push(<tr role="row" key={rIndex}>{cols(rIndex)}</tr>);
        }
        return rowArray;
    }

    return (
        <table style={styles.table}>
            <thead>
                <tr role="header">
                    <th colSpan={props.columnsCount} style={styles.tableHeaderCell}>{props.title ? props.title : ''}</th>
                </tr>
            </thead>
            <tbody>
                {rows()}
            </tbody>
        </table>
    );
}

export {Table}
