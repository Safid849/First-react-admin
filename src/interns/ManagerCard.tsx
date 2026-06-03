import { useRecordContext, useGetOne } from 'react-admin';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const ManagerCard = () => {
    const record = useRecordContext();
    
    const { data: manager, isPending, error } = useGetOne(
        'employees',
        { id: record?.managerId },
        { enabled: !!record?.managerId }
    );

    if (isPending) return <CircularProgress size={20} />;
    if (error) return <Typography color="error">Erreur lors du chargement du manager</Typography>;
    if (!manager) return <Typography color="textSecondary">Aucun manager affecté</Typography>;

    return (
        <Card variant="outlined" style={{ marginTop: '20px', backgroundColor: '#fafafa', borderRadius: '8px' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom style={{ color: '#1976d2', fontWeight: 'bold' }}>
                    Fiche du Manager Équipier
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: '8px' }}>
                    <AccountCircleIcon color="action" />
                    <Typography>
                        <strong>Nom Complet :</strong> {manager.firstname} {manager.lastname}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: '8px' }}>
                    <BusinessIcon color="action" />
                    <Typography>
                        <strong>Département :</strong> {manager.department}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: '8px' }}>
                    <EmailIcon color="action" />
                    <Typography>
                        <strong>Email :</strong> <a href={`mailto:${manager.email}`} style={{ textDecoration: 'none', color: '#1976d2' }}>{manager.email}</a>
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography><strong>Statut :</strong></Typography>
                    {manager.active ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'success.main' }}>
                            <CheckCircleIcon fontSize="small" />
                            <Typography variant="body2" style={{ fontWeight: 'bold' }}>Actif</Typography>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'error.main' }}>
                            <CancelIcon fontSize="small" />
                            <Typography variant="body2" style={{ fontWeight: 'bold' }}>Inactif</Typography>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};