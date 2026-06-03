import { Edit, SimpleForm, TextInput, BooleanInput, NumberInput, ReferenceInput, SelectInput } from 'react-admin';
import { useRecordContext } from 'react-admin';

const InternTitle = () => {
    const record = useRecordContext();
    if (!record) return <span>Chargement...</span>;
    return <span>Modifier : {record.firstname} {record.lastname}</span>;
};

export const InternEdit = () => (
    <Edit title={<InternTitle />} redirect="list">
        <SimpleForm>
            <TextInput source="firstname" label="Prénom" />
            <TextInput source="lastname" label="Nom" />
            <TextInput source="email" label="Email" />
            <SelectInput source="department" label="Département" choices={[
                { id: 'Informatique', name: 'Informatique' },
                { id: 'Marketing', name: 'Marketing' },
                { id: 'RH', name: 'RH' },
                { id: 'Finance', name: 'Finance' },
            ]} />
            <BooleanInput source="isRemunerate" label="Est Rémunéré" />
            <NumberInput source="remuneration" label="Rémunération" />
            <ReferenceInput source="managerId" reference="employees">
                <SelectInput optionText="lastname" label="Manager" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);