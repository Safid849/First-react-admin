import { useState } from 'react';
import { 
    List, Datagrid, TextField, NumberField, BooleanField, ReferenceField, 
    EditButton, DeleteButton, SearchInput, SelectInput, useCreate, useRefresh 
} from 'react-admin';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField as MuiTextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const internFilters = [
    <SearchInput source="q" alwaysOn />,
    <SelectInput source="department" choices={[
        { id: 'Informatique', name: 'Informatique' },
        { id: 'Marketing', name: 'Marketing' },
        { id: 'RH', name: 'RH' },
        { id: 'Finance', name: 'Finance' },
    ]} />,
    <SelectInput source="isRemunerate" label="Rémunéré" choices={[
        { id: true, name: 'Oui' },
        { id: false, name: 'Non' },
    ]} />
];

export const InternList = () => {
    const [open, setOpen] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [managerId, setManagerId] = useState('');
    
    const [create, { isLoading }] = useCreate();
    const refresh = useRefresh();

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFirstname('');
        setLastname('');
        setManagerId('');
    };

    const handleSave = () => {
        create(
            'interns',
            { data: { firstname, lastname, managerId, email: `${firstname.toLowerCase()}@intern.com`, department: 'Informatique', isRemunerate: false, remuneration: 0 } },
            {
                onSuccess: () => {
                    refresh(); // Recharge la liste de façon transparente
                    handleClose();
                }
            }
        );
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpen} style={{ margin: '10px' }}>
                Ajouter stagiaire rapide
            </Button>
            
            <List filters={internFilters}>
                <Datagrid rowClick="show">
                    <TextField source="firstname" label="Prénom" />
                    <TextField source="lastname" label="Nom" />
                    <TextField source="email" label="Email" />
                    <TextField source="department" label="Département" />
                    <NumberField source="remuneration" label="Rémunération" options={{ style: 'currency', currency: 'EUR' }} />
                    <BooleanField source="isRemunerate" label="Rémunéré" />
                    <ReferenceField source="managerId" reference="employees" label="Manager">
                        <TextField source="lastname" />
                    </ReferenceField>
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
            </List>

            {/* Modale Formulaire Rapide (Exercice 11) */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                <DialogTitle>Ajouter un stagiaire rapide</DialogTitle>
                <DialogContent>
                    <MuiTextField label="Prénom" fullWidth margin="dense" value={firstname} onChange={e => setFirstname(e.target.value)} />
                    <MuiTextField label="Nom" fullWidth margin="dense" value={lastname} onChange={e => setLastname(e.target.value)} />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Manager ID</InputLabel>
                        <Select value={managerId} onChange={e => setManagerId(e.target.value as string)}>
                            <MenuItem value="1">Alice Martin (Informatique)</MenuItem>
                            <MenuItem value="2">Bob Dupont (Marketing)</MenuItem>
                            <MenuItem value="4">David Lefebvre (Finance)</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleSave} color="primary" variant="contained" disabled={isLoading}>Sauvegarder</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};