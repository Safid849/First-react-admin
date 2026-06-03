import { useRecordContext, useUpdate } from 'react-admin';
import { Button } from '@mui/material';

export const QuickStatusToggle = () => {
    const record = useRecordContext();
    const [update, { isLoading }] = useUpdate();

    if (!record) return null;

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        
        update(
            'employees',
            { 
                id: record.id, 
                data: { ...record, active: !record.active }, 
                previousData: record 
            },
            { mutationMode: 'optimistic' }
        );
    };

    return (
        <Button
            variant="contained"
            color={record.active ? 'error' : 'success'}
            disabled={isLoading}
            onClick={handleToggle}
            size="small"
        >
            {record.active ? 'Désactiver' : 'Activer'}
        </Button>
    );
};