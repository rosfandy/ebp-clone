import { SelectInput } from "@/Components/Input/Select/SelectInput";
import { DashboardNavbar } from "@/Components/Navigation/Navbar/DashboardNavbar";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { FormSection } from "./Partials/FormSection";
import { TextInput } from "@/Components/Input/Text/TextInput";
import { useEffect, useState } from "react";
import { Button } from "@/Components/Button/Button";
import { Head, router } from "@inertiajs/react";
import { capitalizeFirstLetter } from "@/Utils/utils";
import { RegisterPopup } from "@/Components/Popup/RegisterPopup";

const Register = ({ user, faculties, departments, degrees }) => {
    const { t } = useLaravelReactI18n();
    const [selectedFacultyId, setSelectedFacultyId] = useState(null);
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [errors, setErrors] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [payload, setPayload] = useState({});
    const path = window.location.pathname;

    useEffect(() => {
        filterDepartments();
    }, [selectedFacultyId]);

    const handleFacultyChange = (data) => {
        setSelectedFacultyId(data);
    };

    const validateForm = (data) => {
        const newErrors = {};
        if (!data.degree_id) newErrors.degree_id = t(':name, is required', { name: t('Degree') });
        if (!data.faculty_id) newErrors.faculty_id = t(':name, is required', { name: t('Faculty') });
        if (!data.department_id) newErrors.department_id = t(':name, is required', { name: t('Department') });
        if (!data.final_project) newErrors.final_project = t(':name, is required', { name: t('Final Project') });
        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        let data = Object.fromEntries(formData.entries());

        data = {
            ...data,
            'user_id': user.id
        };
        setPayload(data);

        const validationErrors = validateForm(data);
        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        setFormData({
            'department': departments.filter(department => department.id == data.department_id)[0].name,
            'faculty': faculties.filter(faculty => faculty.id == data.faculty_id)[0].name,
            'degree': degrees.filter(degree => degree.id == data.degree_id)[0].name,
            'final project': data.final_project
        });
        setIsPopupOpen(true);
    };

    const handleConfirm = (data) => {
        router.post('/student/register', data, {
            onError: (errors) => {
                setErrors(errors);
            }
        });
        setIsPopupOpen(false);

    }
    const filterDepartments = () => {
        const filter = selectedFacultyId
            ? departments.filter(department => department.faculty_id == selectedFacultyId)
            : [];
        setFilteredDepartments(filter);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <Head title={t(`${capitalizeFirstLetter(path.split('/').pop())}`)} />

            <div className="flex flex-col justify-center min-h-[80vh]">
                <div className="flex justify-center p-4 ">
                    <div className="bg-white lg:w-2/3 xl:w-1/2 w-full shadow-xl border flex p-8 rounded-xl">
                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="">
                                <div className="flex items-center gap-x-4">
                                    <img src="/img/logo-icon.png" alt="" width="75" />
                                    <h4 className="lg:text-2xl text-gray-500">E-Bebas Pustaka <span className="text-blue-500 font-semibold">ITS</span></h4>
                                </div>
                                <p className="font-semibold md:text-xl pt-4 pb-8">{t('Complete Your Data')}</p>
                            </div>

                            {errors &&
                                <div className="flex flex-col gap-y-2">
                                    {errors.user_id && <p className="text-red-500 text-sm pb-4">{errors.user_id}</p>}
                                    {errors.degree_id && <p className="text-red-500 text-sm pb-4">{errors.degree_id}</p>}
                                    {errors.faculty_id && <p className="text-red-500 text-sm pb-4">{errors.faculty_id}</p>}
                                    {errors.department_id && <p className="text-red-500 text-sm pb-4">{errors.department_id}</p>}
                                    {errors.final_project && <p className="text-red-500 text-sm pb-4">{errors.final_project}</p>}
                                </div>
                            }

                            <div id="form-control" className="flex flex-col gap-y-4">
                                <FormSection title={t(':name, Information', { name: t('Academic') })}>
                                    <SelectInput
                                        datas={degrees}
                                        title={t('Degree')}
                                        useLocale={'degree'}
                                        name='degree_id'
                                        required={true}
                                        placeholder={t('Select, :name', { name: t('Degree') })}
                                        error={formErrors.degree_id}
                                    />
                                </FormSection>
                                <FormSection>
                                    <SelectInput
                                        datas={faculties}
                                        title={t('Faculty')}
                                        name='faculty_id'
                                        onChange={handleFacultyChange}
                                        placeholder={t('Select, :name', { name: t('Faculty') })}
                                        error={formErrors.faculty_id}
                                        useCode={true}
                                    />
                                </FormSection>
                                <FormSection>
                                    <SelectInput
                                        datas={filteredDepartments}
                                        title={t('Department')}
                                        name='department_id'
                                        disabled={!selectedFacultyId}
                                        placeholder={t('Select, :name', { name: t('Department') })}
                                        error={formErrors.department_id}
                                    />
                                </FormSection>
                                <FormSection>
                                    <TextInput
                                        title={t('Final Project')}
                                        placeholder={t('Enter Title')}
                                        name='final_project'
                                        error={formErrors.final_project}
                                    />
                                </FormSection>
                            </div>
                            <div className="w-full py-8">
                                <Button type="submit" size="small" label={t('Save')} className="w-full" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <RegisterPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onConfirm={() => handleConfirm(payload)}
                data={formData}
            />
        </div>
    );
}

export default Register;