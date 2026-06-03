import { useGetList } from 'react-admin';
import { Card, CardContent, Typography, CircularProgress, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

// Composant visuel de carte rendu cliquable grâce à react-router-dom
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
            textDecoration: 'none', // Supprime le soulignement du lien
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
    // 1. Un seul appel pour les employés (Évite les collisions de re-rendus sous React 19)
    const { data: employees, isPending: pendingEmp } = useGetList('employees', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'id', order: 'ASC' },
        filter: {}
    });

    // 2. Un seul appel pour les stagiaires
    const { data: interns, isPending: pendingInt } = useGetList('interns', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'id', order: 'ASC' },
        filter: {}
    });

    // 3. Calculs locaux instantanés en mémoire
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

            {/* Boutons d'actions rapides (Créations) */}
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
            
            {/* Grille Flexbox contenant les Cartes de Statistiques Cliquables */}
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
                {/* Redirige vers la liste complète des employés */}
                <CardUI 
                    title="Total Employés" 
                    value={totalEmployees} 
                    isPending={isPending} 
                    to="/employees" 
                />

                {/* Redirige vers la liste des employés en appliquant le filtre "active: true" */}
                <CardUI 
                    title="Employés Actifs" 
                    value={activeEmployees} 
                    isPending={isPending} 
                    to={`/employees?filter=${encodeURIComponent(JSON.stringify({ active: true }))}`} 
                />

                {/* Redirige vers la liste complète des stagiaires */}
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