import { Create, SimpleForm, TextInput, BooleanInput, NumberInput, ReferenceInput, SelectInput, required } from 'react-admin';
import { useWatch } from 'react-hook-form';

export const InternCreate = () => {
    const validateForm = (values: any) => {
        const errors: any = {};
        if (!values.firstname) errors.firstname = 'Obligatoire';
        if (!values.lastname) errors.lastname = 'Obligatoire';
        if (!values.email) {
            errors.email = 'Obligatoire';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Format email invalide';
        }
        if (!values.department) errors.department = 'Obligatoire';
        
        if (values.isRemunerate && (values.remuneration === undefined || values.remuneration === null || values.remuneration <= 0)) {
            errors.remuneration = 'La rémunération est obligatoire si le stagiaire est rémunéré';
        }
        return errors;
    };

    const FilteredManagerInput = () => {
        const currentDepartment = useWatch({ name: 'department' });
        return (
            <ReferenceInput 
                source="managerId" 
                reference="employees"
                filter={{ department: currentDepartment, active: true }} // Filtre domaine + actif (Ex 7.1)
            >
                <SelectInput optionText={(choice) => `${choice.firstname} ${choice.lastname}`} label="Manager disponible" validate={required()} />
            </ReferenceInput>
        );
    };

    return (
        <Create redirect="list">
            <SimpleForm validate={validateForm}>
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
                <NumberInput source="remuneration" label="Rémunération (€)" />
                <FilteredManagerInput />
            </SimpleForm>
        </Create>
    );
};