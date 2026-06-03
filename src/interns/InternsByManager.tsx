import { useRecordContext, useGetList, Link } from 'react-admin';
import { Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';

export const InternsByManager = () => {
    const record = useRecordContext();
    
    const { data: interns, isPending, error } = useGetList(
        'interns',
        {
            pagination: { page: 1, perPage: 50 },
            sort: { field: 'id', order: 'ASC' },
            filter: { managerId: record?.id }
        },
        { enabled: !!record?.id }
    );

    if (isPending) return <CircularProgress size={15} />;
    if (error) return null;

    const total = interns ? interns.length : 0;

    return (
        <div style={{ marginTop: '20px' }}>
            <Typography variant="h6">Stagiaires encadrés ({total})</Typography>
            {total === 0 ? (
                <Typography color="textSecondary">Aucun stagiaire n'est rattaché à cet employé.</Typography>
            ) : (
                <List>
                    {interns?.map(intern => (
                        <ListItem key={intern.id} component={Link} to={`/interns/${intern.id}/show`} button>
                            <ListItemText primary={`${intern.firstname} ${intern.lastname}`} secondary={intern.email} />
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};