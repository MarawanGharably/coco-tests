import { Table } from 'react-bootstrap';
import React from 'react';

export default function RecordsList({ headers = [], records = [], ItemComponent, className='' }) {
    return (
        <Table className={className}>
            <thead>
                <tr>
                    {headers.map((item, i) => (
                        <th key={i}>{item}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {records.length <= 0 && (<tr>
                        <td>No Records</td>
                    </tr>)}
                {records.map((item, i) => {
                    return <ItemComponent key={i} idx={i + 1} data={item} />;
                })}
            </tbody>
        </Table>
    );
}
