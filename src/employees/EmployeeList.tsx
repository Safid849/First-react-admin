import { List, Datagrid, TextField, NumberField, BooleanField, EditButton, DeleteButton, SearchInput, SelectInput } from 'react-admin';
import { QuickStatusToggle } from '../interns/QuickStatusToggle';

const employeeFilters = [
    <SearchInput source="q" alwaysOn />,
    <SelectInput source="department" choices={[
        { id: 'Informatique', name: 'Informatique' },
        { id: 'Marketing', name: 'Marketing' },
        { id: 'RH', name: 'RH' },
        { id: 'Finance', name: 'Finance' },
    ]} />,
    <SelectInput source="active" label="Statut" choices={[
        { id: true, name: 'Actif' },
        { id: false, name: 'Inactif' },
    ]} />
];

export const EmployeeList = () => (
    <List filters={employeeFilters} perPage={5}>
        <Datagrid rowClick="show">
            <TextField source="firstname" label="Prénom" />
            <TextField source="lastname" label="Nom" />
            <TextField source="email" label="Email" />
            <TextField source="department" label="Département" />
            <NumberField source="salary" label="Salaire" options={{ style: 'currency', currency: 'EUR' }} />
            <BooleanField source="active" label="Actif" />
            <QuickStatusToggle />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);