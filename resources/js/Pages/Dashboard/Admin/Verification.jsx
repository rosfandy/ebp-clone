import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { TitleSection } from "../Partials/TitleSection";
import { ContentSection } from "../Partials/ContentSection";
import { Table } from "@/Components/Table/Table";
import { useEffect, useState } from "react";
import { SelectInput } from "@/Components/Input/Select/SelectInput";
import { FormSection } from "../Student/Register/Partials/FormSection";
import { Button } from "@/Components/Button/Button";
import { router } from "@inertiajs/react";
import { TextInput } from "@/Components/Input/Text/TextInput";
import { FaSearch } from "react-icons/fa";
import { FaDownload, FaFileExcel, FaFilter } from "react-icons/fa6";
import { LuRefreshCw } from "react-icons/lu";
import { TablePagination } from "@/Components/Pagination/TablePagination";

const Verification = ({ user, students, pagination, faculties, departments, verifications }) => {
    const { t } = useLaravelReactI18n();

    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    const status_id = urlParams.get('status_id');
    const department_id = urlParams.get('department_id');
    const faculty_id = department_id && departments.find(department => department.id == department_id).faculty_id;
    const departmentfiltered = departments.filter(department => department.faculty_id == faculty_id);

    const [selectedFacultyId, setSelectedFacultyId] = useState(faculty_id || null);
    const [selectedStatusId, setSelectedStatusId] = useState(status_id || null);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(department_id || null);
    const [fields, setFields] = useState(['username', 'name', 'email', 'phone', 'faculty_code', 'department', 'final_project', 'verification_status_id', 'edit_action']);
    const [searchParam, setSearchParam] = useState(search || null);
    const [filteredDepartments, setFilteredDepartments] = useState(departmentfiltered || []);

    const aliases = { name: 'Name', username: 'Nrp', email: 'Email', phone: 'Phone', faculty_code: 'Fakultas', department: 'Department', edit_action: 'Action', final_project: 'Final Project', verification_status_id: 'Status' };
    const authorityNumbers = user.authority != null ? JSON.parse(user.authority).map(Number) : [];

    const filteredVerifications = verifications.filter(verification =>
        authorityNumbers.includes(verification.id)
    );

    useEffect(()=>{
        console.log('tests')
    },[])

    useEffect(() => {
        const filtered = departments.filter(department => department.faculty_id == selectedFacultyId);
        setFilteredDepartments(filtered);
    }, [selectedFacultyId])

    useEffect(() => {
        if (selectedStatusId) {
            fields.pop();
            fields.pop();
            setFields([...fields, 'verification_action']);
        }
    }, [selectedStatusId])

    const handleFilter = ({ department_id = selectedDepartmentId, status_id = selectedStatusId, search: searchParam, page }) => {
        setSelectedDepartmentId(department_id);
        setSelectedStatusId(status_id);
        setSearchParam(searchParam);
        filterData({ department_id, status_id, search: searchParam, page });
    }

    const handleReset = () => {
        router.get(`${window.location.pathname}`);
    }

    const filterData = ({ department_id, status_id, search, page }) => {
        if (page) page = String(page)
        router.get(`${window.location.pathname}`, { department_id, status_id, search, page: page });
    }

    return (
        <>
            <DashboardLayout user={user}>
                <TitleSection title={t(`Menu, :menu_name`, { menu_name: t('Verification') })} description={t('You can manage all, :menu_name, such as editing and more', { menu_name: t('Verification') })} />
                <div id="container" className="flex lg:flex-row flex-col gap-x-4 gap-y-4">
                    <ContentSection title={t('List of, :data_name', { data_name: t('Student') })}>
                        <FormSection>
                            <SelectInput defaultValue={selectedFacultyId} datas={faculties} title={'Faculty'} useCode={true} onChange={(id) => setSelectedFacultyId(id)} />
                            <SelectInput
                                defaultValue={selectedDepartmentId}
                                datas={filteredDepartments} title={'Department'}
                                disabled={!selectedFacultyId}
                                onChange={(id) => handleFilter({ department_id: id })}
                            />
                        </FormSection>
                        <FormSection>
                            <SelectInput className="md:w-1/2 w-full" defaultValue={selectedStatusId} datas={filteredVerifications} title={t('Verification')} onChange={(id) => handleFilter({ status_id: id })} useLocale={'verification'} />
                            <Button
                                size="small"
                                className="lg:w-[10%] md:w-[25%] w-full text-sm"
                                label={'Reset Filter'}
                                Icon={<LuRefreshCw size={20} />}
                                onClick={handleReset}
                                disabled={!selectedDepartmentId && !selectedStatusId && !searchParam}
                            />
                            {/* <a className="lg:w-[10%] md:w-[25%] w-full text-sm" href={route('log.staff', { id: user.id, status_id: selectedStatusId })}>
                                <Button
                                    size="small"
                                    label={t('Log Activity')}
                                    Icon={<FaDownload size={20} />}
                                    variant="success"
                                />
                            </a> */}
                        </FormSection>
                        <FormSection>
                            <TextInput
                                defaultValue={searchParam}
                                onChange={(value) => setSearchParam(value)}
                                onClick={() => handleFilter({ search: searchParam })}
                                placeholder={`${t('Input, :name', { name: t('Name') }) + ' ' + t('or, :name', { name: 'NRP' })}`}
                                className="py-1"
                            />
                            <Button
                                size="small"
                                className="md:w-1/5 w-full text-sm"
                                label="Cari"
                                Icon={<FaSearch />}
                                onClick={() => handleFilter({ search: searchParam })}
                            />
                        </FormSection>
                        <Table
                            datas={students}
                            fields={fields}
                            aliases={aliases}
                            pagination={pagination}
                            useSearch={false}
                        />
                        {pagination != null && pagination.last_page !== 1 &&
                            <TablePagination pagination={pagination} handleFilter={handleFilter} />
                        }
                    </ContentSection>
                </div>
            </DashboardLayout>
        </>
    );
}

export default Verification;