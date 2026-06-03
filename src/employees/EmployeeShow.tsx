import { 
    Show, 
    SimpleShowLayout, 
    TextField, 
    NumberField, 
    BooleanField,
    TopToolbar,
    ListButton,
    EditButton
} from 'react-admin';

const ShowActions = () => (
    <TopToolbar>
        <ListButton />
        <EditButton />
    </TopToolbar>
);

export const EmployeeShow = () => (
    <Show actions={<ShowActions />}>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="firstname" label="Prénom" />
            <TextField source="lastname" label="Nom" />
            <TextField source="email" label="Email" />
            <TextField source="department" label="Département" />
            <NumberField 
                source="salary" 
                label="Salaire" 
                options={{ style: 'currency', currency: 'EUR' }} 
            />
            <BooleanField source="active" label="Actif" />
        </SimpleShowLayout>
    </Show>
);