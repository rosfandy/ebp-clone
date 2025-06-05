import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { TitleSection } from "../Partials/TitleSection";
import { ContentSection } from "../Partials/ContentSection";
import { Table } from "@/Components/Table/Table";
import { SelectInput } from "@/Components/Input/Select/SelectInput";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/Components/Button/Button";
import { AnimatePresence } from "framer-motion";
import { FormPopup } from "@/Components/Popup/FormPopup";
import { usePage } from "@inertiajs/react";

const Academic = ({ user, degrees, departments, faculties }) => {
    const { flash } = usePage().props;
    const { t } = useLaravelReactI18n();
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [selectedFacultyId, setSelectedFacultyId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [typeRoute, setTypeRoute] = useState('');
    const fields = ['code', 'name', 'edit_action'];
    const aliases = { code: 'Code', name: 'Name', edit_action: 'Action' };
    const dataFields = {
        id: '',
        ...Object.fromEntries(fields.map(field => [field, '']))
    };

    useEffect(() => {
        filterDepartments();
    }, [flash, selectedFacultyId]);

    const handleFacultyChange = (data) => {
        setSelectedFacultyId(data);
    };

    const handleAddForm = (route) => {
        setShowForm(true);
        setTypeRoute(route);
    }
    const filterDepartments = () => {
        const filter = selectedFacultyId
            ? departments.filter(department => department.faculty_id == selectedFacultyId)
            : [];
        setFilteredDepartments(filter);
    };

    return (
        <>
            <DashboardLayout user={user}>
                <TitleSection title={t(`Menu, :menu_name`, { menu_name: t('Academic') })} description={t('You can manage all, :menu_name, such as editing and more', { menu_name: t('Academic') })} />

                <div id="container" className="flex flex-col gap-x-4 gap-y-4">
                    <ContentSection>
                        <div className="flex justify-between">
                            <div className="text-sm text-gray-500">{t('List of, :data_name', { data_name: t('Degree') })}</div>
                            <Button onClick={() => handleAddForm('degree')} Icon={<FaPlus />} size="small" label={t('Add')} />
                        </div>
                        <Table id="degree" datas={degrees} fields={fields} aliases={aliases} useSearch={false} />
                    </ContentSection>

                    <ContentSection>
                        <div className="flex justify-between">
                            <div className="text-sm text-gray-500">{t('List of, :data_name', { data_name: t('Faculty') })}</div>
                            <Button onClick={() => handleAddForm('faculty')} Icon={<FaPlus />} size="small" label={t('Add')} />
                        </div>
                        <Table id="faculties" datas={faculties} fields={fields} aliases={aliases} useSearch={false} />
                    </ContentSection>

                    <ContentSection className="w-full">
                        <div className="flex justify-between">
                            <div className="text-sm text-gray-500">{t('List of, :data_name', { data_name: t('Department') })}</div>
                            <Button onClick={() => handleAddForm('department')} Icon={<FaPlus />} size="small" label={t('Add')} disabled={!selectedFacultyId} />
                        </div>
                        <SelectInput
                            datas={faculties}
                            title={t('Faculty')}
                            name='faculty_id'
                            onChange={handleFacultyChange}
                            placeholder={t('Select, :name', { name: t('Faculty') })}
                            useCode={true}
                        />
                        <Table id="departments" datas={filteredDepartments} fields={fields} aliases={aliases} useSearch={false} />
                    </ContentSection>
                </div>

            </DashboardLayout>
            <AnimatePresence>
                {showForm && (
                    <FormPopup
                        id={typeRoute}
                        title="Add"
                        method="post"
                        fields={fields}
                        aliases={aliases}
                        data={typeRoute === 'department' ? { ...dataFields, faculty_id: selectedFacultyId } : dataFields}
                        setIsShow={setShowForm}
                    />)}
            </AnimatePresence>
        </>
    );
}

export default Academic;