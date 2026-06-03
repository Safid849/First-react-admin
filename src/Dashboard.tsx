import { useGetList } from 'react-admin';
import { Card, CardContent, Typography, CircularProgress, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const CardUI = ({ 
    title, 
    value, 
    isPending, 
    to 
}: { 
    title: string, 
    value: number, 
    isPending: boolean, 
    to: string 
}) => (
    <Card 
        component={Link} 
        to={to}
        style={{ 
            padding: '10px', 
            textAlign: 'center', 
            height: '100%', 
            textDecoration: 'none', 
            display: 'block',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer'
        }}
        sx={{
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
                backgroundColor: '#f5f5f5'
            }
        }}
    >
        <CardContent>
            <Typography color="textSecondary" gutterBottom variant="h6">{title}</Typography>
            <Typography variant="h3" component="h2" style={{ fontWeight: 'bold', color: '#1976d2' }}>
                {isPending ? <CircularProgress size={30} /> : value}
            </Typography>
        </CardContent>
    </Card>
);

export const Dashboard = () => {
    const { data: employees, isPending: pendingEmp } = useGetList('employees', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'id', order: 'ASC' },
        filter: {}
    });

    const { data: interns, isPending: pendingInt } = useGetList('interns', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'id', order: 'ASC' },
        filter: {}
    });

    const totalEmployees = employees ? employees.length : 0;
    const activeEmployees = employees ? employees.filter(e => e.active === true).length : 0;
    
    const totalInterns = interns ? interns.length : 0;
    const remuneratedInterns = interns ? interns.filter(i => i.isRemunerate === true).length : 0;

    const isPending = pendingEmp || pendingInt;

    return (
        <div style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom style={{ marginBottom: '10px' }}>
                Tableau de Bord RH
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, marginBottom: '30px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PersonAddIcon />}
                    component={Link}
                    to="/employees/create"
                    sx={{ padding: '10px 20px', fontWeight: 'bold' }}
                >
                    Nouvel Employé
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<GroupAddIcon />}
                    component={Link}
                    to="/interns/create"
                    sx={{ padding: '10px 20px', fontWeight: 'bold' }}
                >
                    Nouveau Stagiaire
                </Button>
            </Box>
            
            <Box 
                sx={{ 
                    display: 'flex', 
                    gap: 3, 
                    flexWrap: 'wrap',
                    '& > *': {
                        flex: '1 1 calc(25% - 24px)', 
                        minWidth: '250px'             
                    }
                }}
            >
                <CardUI 
                    title="Total Employés" 
                    value={totalEmployees} 
                    isPending={isPending} 
                    to="/employees" 
                />

                <CardUI 
                    title="Employés Actifs" 
                    value={activeEmployees} 
                    isPending={isPending} 
                    to={`/employees?filter=${encodeURIComponent(JSON.stringify({ active: true }))}`} 
                />

                <CardUI 
                    title="Total Stagiaires" 
                    value={totalInterns} 
                    isPending={isPending} 
                    to="/interns" 
                />

                <CardUI 
                    title="Stagiaires Rémunérés" 
                    value={remuneratedInterns} 
                    isPending={isPending} 
                    to={`/interns?filter=${encodeURIComponent(JSON.stringify({ isRemunerate: true }))}`} 
                />
            </Box>
        </div>
    );
};