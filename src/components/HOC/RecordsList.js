import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';

//TODO: limit === 1000 used as a temporary solution. Refactor it later.

export default function RecordsList({ headers = [], fetchRecordsFN, ItemComponent, className = '', useLoadMore = false }) {
    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState([]);
    let start = 0;
    const limit = 10;

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = () => {
        setLoading(true);
        let params = {};
        if (useLoadMore) {
            params.start = records.length > 0 ? limit : start;
            params.limit = records.length <= 0 ? limit : 1000;
        }

        fetchRecordsFN(params)
            .then((res) => {
                setRecords([...records, ...res]);
            })
            .catch((err) => {})
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <Table className={className}>
                <THeader headers={headers} />

                <tbody>
                    {!loading && records.length == 0 && (
                        <tr>
                            <td colSpan={4}>No Records</td>
                        </tr>
                    )}

                    {records?.map((item, i) => {
                        return <ItemComponent key={i} idx={i + 1} data={item} />;
                    })}
                </tbody>
            </Table>

            {loading && <Loader />}
            {useLoadMore && <LoadMore loading={loading} records={records} limit={limit} fetchRecords={fetchRecords} />}
        </>
    );
}

const LoadMore = ({ records, limit, loading, fetchRecords }) => {
    //Show 'Load More' only when first 10 records was fetched
    if (records.length !== limit || loading) return false;
    return (
        <Button variant="link" onClick={fetchRecords} style={{ color: '#fff', fontWeight: 'lighter' }}>
            Load More
        </Button>
    );
};

const Loader = () => (
    <div className="d-flex justify-content-center  align-items-center" style={{ minHeight: '10em' }}>
        <Spinner animation="border" variant="primary" />
    </div>
);

const THeader = ({ headers }) => (
    <thead>
        <tr>
            {headers.map((item, i) => (
                <th key={i}>{item}</th>
            ))}
        </tr>
    </thead>
);
