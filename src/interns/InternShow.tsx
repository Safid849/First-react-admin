import { Show, SimpleShowLayout, TextField, NumberField, BooleanField, ReferenceField } from 'react-admin';
import { ManagerCard } from './ManagerCard';

export const InternShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="ID Stagiaire" />
            <TextField source="firstname" label="Prénom" />
            <TextField source="lastname" label="Nom" />
            <TextField source="email" label="Email" />
            <TextField source="department" label="Département" />
            <NumberField source="remuneration" label="Rémunération" options={{ style: 'currency', currency: 'EUR' }} />
            <BooleanField source="isRemunerate" label="Rémunéré" />
            
            <ReferenceField source="managerId" reference="employees" label="Lien Fiche Manager" link="show">
                <TextField source="lastname" />
            </ReferenceField>
            
            <ManagerCard />
        </SimpleShowLayout>
    </Show>
);