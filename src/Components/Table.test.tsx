import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Table } from './Table';

const getRandomNumber = (max: number) => {
    return Math.floor(Math.random() * max) + 1
}

describe('Table should render without crashing', () => {
    it('should render Table by default', () => {
        render(
            <Table 
                title={'test'} 
                rowCount={0} 
                columnsCount={0} 
                fetchData={ (rowIndex: number, colIndex: number) => {
                    return (<span>{getRandomNumber(100)}</span>)
                }} 
            />
        );

        expect(screen.getByText("test")).toBeInTheDocument();
        expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it('Table row count check', () => {
        let rowCount = getRandomNumber(10);
        render(
            <Table 
                title={'test'} 
                rowCount={rowCount} 
                columnsCount={1} 
                fetchData={ (rowIndex: number, colIndex: number) => {
                    return (<span>{getRandomNumber(100)}</span>)
                }} 
            />
        );

        expect(screen.getByText("test")).toBeInTheDocument();
        expect(screen.getByRole("table")).toBeInTheDocument();
        expect(screen.getAllByRole("row")).toHaveLength(rowCount);
    });

    it('Table column count check', () => {
        let colCount = getRandomNumber(10);
        render(
            <Table 
                title={'test'} 
                rowCount={1} 
                columnsCount={colCount} 
                fetchData={ (rowIndex: number, colIndex: number) => {
                    return (<span role="value">{getRandomNumber(100)}</span>)
                }} 
            />
        );

        expect(screen.getByText("test")).toBeInTheDocument();
        expect(screen.getByRole("table")).toBeInTheDocument();
        expect(screen.getAllByRole("column")).toHaveLength(colCount);
    });


    it('Table cells count check', () => {
        let rowCount = getRandomNumber(10);
        let colCount = getRandomNumber(10);
        render(
            <Table 
                title={'test'} 
                rowCount={rowCount} 
                columnsCount={colCount} 
                fetchData={ (rowIndex: number, colIndex: number) => {
                    return (<span role="value">{getRandomNumber(100)}</span>)
                }} 
            />
        );

        expect(screen.getByText("test")).toBeInTheDocument();
        expect(screen.getByRole("table")).toBeInTheDocument();
        expect(screen.getAllByRole("value")).toHaveLength(colCount * rowCount);
    });

    it('checking if cellClassName is added correctly', () => {
        let className = "testingClass123";
        render(
            <Table 
                title={'test'} 
                rowCount={1} 
                columnsCount={1} 
                cellClassName={ (rowIndex: number, colIndex: number) => {
                    return className;
                }}
                fetchData={ (rowIndex: number, colIndex: number) => {
                    return (<span role="value">{getRandomNumber(100)}</span>)
                }} 
            />
        );

        expect(screen.getByText("test")).toBeInTheDocument();
        expect(screen.getByRole("table")).toBeInTheDocument();
        expect(screen.getByRole("column")).toHaveClass(className);
    });    

    it('checking if styles is added correctly', () => {
        let style = { height : "5px"};
        render(
            <Table 
                title={'test'} 
                rowCount={1} 
                columnsCount={1} 
                cellStyles={ (rowIndex: number, colIndex: number) => {
                    return style;
                }}
                fetchData={ (rowIndex: number, colIndex: number) => {
                    return (<span role="value">{getRandomNumber(100)}</span>)
                }} 
            />
        );

        expect(screen.getByText("test")).toBeInTheDocument();
        expect(screen.getByRole("table")).toBeInTheDocument();
        expect(screen.getByRole("column")).toHaveStyle(style);
    });
});