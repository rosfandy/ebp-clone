import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { TitleSection } from "../Partials/TitleSection";
import { ContentSection } from "../Partials/ContentSection";
import { PieChart } from "@/Components/Chart/PieChart";
import { useEffect, useState } from "react";
import { SelectInput } from "@/Components/Input/Select/SelectInput";
import { Button } from "@/Components/Button/Button";
import { FormSection } from "../Student/Register/Partials/FormSection";
import { BarChart } from "@/Components/Chart/BarChart";
import { capitalizeFirstLetter } from "@/Utils/utils";

const Dashboard = ({ user, total_student, students, verifications, faculties, departments }) => {
    const [dataPieSeries, setDataPieSeries] = useState([])
    const [dataBarSeries, setDataBarSeries] = useState([])
    const [pieLabels, setPieLabels] = useState([])
    const [barLabels, setBarLabels] = useState([])
    const [selectedFacultyId, setSelectedFacultyId] = useState(null)
    const [_, setSelectedDepartmentId] = useState(null)
    const [selectedStatusId, setSelecetdStatusId] = useState(1)
    const [totalData, setTotalData] = useState(total_student)
    const [filteredStudents, setFilteredStudents] = useState(students)
    const [filteredDepartmens, setFilteredDepartments] = useState(departments)

    const { t } = useLaravelReactI18n()

    useEffect(() => {
        dataProcessing()
    }, [t, filteredStudents, selectedStatusId])

    const dataProcessing = () => {
        const verificationCounts = initializeCounts(verifications);
        const facultyCounts = initializeCounts(faculties);
        const departmentCounts = initializeCounts(filteredDepartmens);

        countVerifications(filteredStudents, verificationCounts);

        if (selectedFacultyId) {
            countDepartments(filteredStudents, departmentCounts);
        } else {
            countFaculties(filteredStudents, facultyCounts);
        }

        const pieData = verifications.map(verification => verificationCounts[verification.id] || 0);
        const pielabels = verifications.map(verification => t(`${verification.name}`));

        const barData = selectedFacultyId ? filteredDepartmens.map(department => departmentCounts[department.id] || 0)
            : faculties.map(faculty => facultyCounts[faculty.id] || 0);
        const barlabels = selectedFacultyId ? filteredDepartmens.map(department => capitalizeFirstLetter(department.name)) : faculties.map(faculty => faculty.code);

        setDataPieSeries(pieData)
        setPieLabels(pielabels)
        setDataBarSeries(barData)
        setBarLabels(barlabels)
    }

    const handleFacultyChange = (id) => {
        const filterStudents = students.filter(student => student.faculty_id == id);
        const totalData = filterStudents.length
        const filterDepartments = departments.filter(department => department.faculty_id == id);
        setSelectedFacultyId(id)
        setFilteredStudents(filterStudents)
        setFilteredDepartments(filterDepartments)
        setTotalData(totalData)
    }

    const handleStatusChange = (id) => {
        setSelecetdStatusId(id)
    }

    const handleReset = () => {
        setSelectedFacultyId(null)
        setSelectedDepartmentId(null)
        setSelecetdStatusId(null)
        setFilteredStudents(students)
        setTotalData(total_student)
    }

    const initializeCounts = (items) => {
        return items.reduce((acc, item) => {
            acc[item.id] = 0;
            return acc;
        }, {});
    }
    const countVerifications = (students, verificationCounts) => {
        students.forEach(student => {
            if (verificationCounts[student.verification_status_id] !== undefined) {
                verificationCounts[student.verification_status_id]++;
            }
        });
    }
    const countDepartments = (students, departmentCounts) => {
        students.forEach(student => {
            if (departmentCounts[student.department_id] !== undefined && parseInt(student.verification_status_id) === selectedStatusId) {
                departmentCounts[student.department_id]++;
            }
        });
    }
    const countFaculties = (students, facultyCounts) => {
        students.forEach(student => {
            if (facultyCounts[student.faculty_id] !== undefined && parseInt(student.verification_status_id) === selectedStatusId) {
                facultyCounts[student.faculty_id]++;
            }
        });
    }


    return (
        <>
            <DashboardLayout user={user}>
                <TitleSection title={t(`You are logged in`)} description={t('Welcome to, :app_name', { app_name: 'E-Bebas Pustaka ITS' })} />

                <div id="container" className="flex lg:flex-row flex-col gap-x-4 gap-y-4">
                    <ContentSection title={t('Submission')}>
                        <div className="flex flex-col justify-center gap-x-2 md:text-md md:mb-4">
                            <div className="font-semibold ">Total Data: {totalData}</div>
                            <div className="text-sm">
                                {selectedFacultyId && <div>
                                    [ {faculties.find(faculty => faculty.id === selectedFacultyId)?.code} ]
                                    - {faculties.find(faculty => faculty.id === selectedFacultyId)?.name}
                                </div>}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="w-480px:block xs:flex xs:justify-center xs:items-center">
                                <PieChart datas={dataPieSeries} labels={pieLabels} />
                            </div>
                        </div>
                    </ContentSection>
                    <ContentSection title={t(':menu_name, Data', { menu_name: t('Student') })}>
                        <FormSection>
                            <SelectInput
                                datas={faculties}
                                title={t('Faculty')}
                                name='faculty_id'
                                onChange={handleFacultyChange}
                                placeholder={t('Select, :name', { name: t('Faculty') })}
                                useCode={true}
                            />
                        </FormSection>
                        <FormSection>
                            <SelectInput
                                datas={verifications}
                                title={'Status'}
                                name='verification_status_id'
                                onChange={handleStatusChange}
                                placeholder={t('Select, :name', { name: 'Status' })}
                                useLocale={'verification'}
                                defaultValue={selectedStatusId}
                            />
                            <Button
                                size="small"
                                className="w-1/3"
                                onClick={handleReset}
                                disabled={!selectedFacultyId && !selectedStatusId}
                                label={t('Reset')} />
                        </FormSection>
                        <BarChart
                            datas={dataBarSeries}
                            labels={barLabels}
                            text={selectedStatusId ?
                                verifications.find(verification => verification.id === selectedStatusId)?.name
                                : 'Status'}
                        />
                    </ContentSection>
                </div>

            </DashboardLayout>
        </>
    );
}

export default Dashboard;   