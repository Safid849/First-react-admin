import { useRecordContext, useGetOne } from 'react-admin';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';

export const ManagerCard = () => {
    const record = useRecordContext();
    
    const { data: manager, isPending, error } = useGetOne(
        'employees',
        { id: record?.managerId },
        { enabled: !!record?.managerId } 
    );

    if (isPending) return <CircularProgress size={20} />;
    if (error) return <Typography color="error">Erreur lors du chargement du manager</Typography>;
    if (!manager) return <Typography>Aucun manager affecté</Typography>;

    return (
        <Card variant="outlined" style={{ marginTop: '15px', backgroundColor: '#fafafa' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>Fiche du Manager Équipier</Typography>
                <Typography>Nom Complet : {manager.firstname} {manager.lastname}</Typography>
                <Typography>Département : {manager.department}</Typography>
                <Typography>Email : <a href={`mailto:${manager.email}`}>{manager.email}</a></Typography>
                <Typography>Statut : {manager.active ? 'Actif ✅' : 'Inactif ❌'}</Typography>
            </CardContent>
        </Card>
    );
};