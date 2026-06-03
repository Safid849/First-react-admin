import { useGetList } from 'react-admin';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';

const DashboardCard = ({ title, resource, filter }: { title: string, resource: string, filter: any }) => {
    const { total, isPending } = useGetList(resource, {
        pagination: { page: 1, perPage: 1 },
        sort: { field: 'id', order: 'ASC' },
        filter: filter
    });

    return (
        <Card style={{ padding: '10px', textAlign: 'center', height: '100%' }}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom variant="h6">{title}</Typography>
                <Typography variant="h3" component="h2" style={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {isPending ? <CircularProgress size={30} /> : total}
                </Typography>
            </CardContent>
        </Card>
    );
};

export const Dashboard = () => (
    <div style={{ marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' }}>
            Tableau de Bord RH
        </Typography>
        
        {/* Box configuré en Flexbox pour aligner les 4 éléments de manière réactive */}
        <Box 
            sx={{ 
                display: 'flex', 
                gap: 3, 
                flexWrap: 'wrap',
                '& > *': {
                    flex: '1 1 calc(25% - 24px)', // Crée 4 colonnes égales sur grand écran
                    minWidth: '250px'             // Passe à la ligne proprement sur petit écran
                }
            }}
        >
            <DashboardCard title="Total Employés" resource="employees" filter={{}} />
            <DashboardCard title="Employés Actifs" resource="employees" filter={{ active: true }} />
            <DashboardCard title="Total Stagiaires" resource="interns" filter={{}} />
            <DashboardCard title="Stagiaires Rémunérés" resource="interns" filter={{ isRemunerate: true }} />
        </Box>
    </div>
);