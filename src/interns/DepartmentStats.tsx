import { useRecordContext, useGetList } from 'react-admin';
import { Typography, CircularProgress } from '@mui/material';

export const DepartmentStats = () => {
    const record = useRecordContext();

    const { total, isPending, error } = useGetList(
        'employees',
        {
            pagination: { page: 1, perPage: 1 }, 
            sort: { field: 'id', order: 'ASC' },
            filter: { department: record?.department, active: true }
        },
        { enabled: !!record?.department }
    );

    if (isPending) return <CircularProgress size={15} />;
    if (error) return null;

    const colleaguesCount = total ? total - 1 : 0;

    return (
        <div style={{ marginTop: '15px', padding: '10px', background: '#eef2f3', borderRadius: '4px' }}>
            <Typography variant="body1">
                🏢 <strong>Statistiques Département :</strong> {colleaguesCount} collègue(s) actif(s) dans le secteur {record?.department}.
            </Typography>
        </div>
    );
};