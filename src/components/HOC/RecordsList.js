import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';


export default function RecordsList({ headers = [], fetchRecordsFN, ItemComponent, className = '', useLoadMore = false }) {
    const [loading, setLoading] = useState(false);
    const [endReached, setEndReached] = useState(false);
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(0);
    const limit = 10;

    useEffect(() => {
        fetchRecords();
    }, [page]);

    const fetchRecords = () => {
        setLoading(true);
        let params = {};
        if (useLoadMore) {
            params.start = page * limit;
            params.limit = limit;
        }

        fetchRecordsFN(params)
            .then((res) => {
                setRecords([...records, ...res]);
                if(useLoadMore && res?.length === 0) setEndReached(true);
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

            {loading && <RecordsPreLoader />}
            {useLoadMore && !endReached && <LoadMore setPage={setPage} loading={loading}    />}
        </>
    );
}

const LoadMore = ({ setPage,  loading }) => {
    //Show 'Load More' only when first 10 records was fetched
    if ( loading) return false;

    return (
        <Button variant="link" onClick={e=>setPage(prevState=>prevState+1)} style={{ color: '#fff', fontWeight: 'lighter' }}>
            Load More
        </Button>
    );
};

const RecordsPreLoader = () => (
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
