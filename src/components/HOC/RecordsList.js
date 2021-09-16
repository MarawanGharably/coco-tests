import { Table } from 'react-bootstrap';
import React, {useEffect, useState} from 'react';

export default function RecordsList({ headers = [], fetchRecordsFN, ItemComponent, className='' }) {
    const [records, setRecords] = useState();

    useEffect(()=>{
        fetchRecordsFN && fetchRecordsFN()
            .then(res=>{
                setRecords(res);
            }).catch(err=>{

            })
    }, []);


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
                {records?.length == 0 && (<tr>
                        <td>No Records</td>
                    </tr>)}
                {records?.map((item, i) => {
                    return <ItemComponent key={i} idx={i + 1} data={item} />;
                })}
            </tbody>
        </Table>
    );
}
