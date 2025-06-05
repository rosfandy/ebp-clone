import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { TitleSection } from "../Partials/TitleSection";
import { ContentSection } from "../Partials/ContentSection";
import { capitalizeFirstLetter } from "@/Utils/utils";
import classNames from "classnames";
import { FaUser } from "react-icons/fa6";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Dashboard = ({ user, student, notifications }) => {
    const { t } = useLaravelReactI18n();

    const statusClass = (statusId) => {
        return classNames('w-fit p-2 font-medium rounded-md border ', {
            'bg-[#ff4560]/5 border-[#ff4560]/30 text-[#ff4560]': statusId === 1,
            'bg-[#775dd0]/5 border-[#775dd0]/30 text-[#775dd0]': statusId === 2,
            'bg-[#ABCE69]/5 border-[#ABCE69]/30 text-[#ABCE69]': statusId === 3,
            'bg-[#00e396]/5 border-[#00e396]/30 text-[#00e396]': statusId === 4,
            'bg-[#ebcc21]/5 border-[#ebcc21]/30 text-[#ebcc21]': statusId === 5,
            'bg-[#26a0fc]/5 border-[#26a0fc]/30 text-[#26a0fc]': statusId === 6,
        })
    }

    return (
        <>
            <DashboardLayout user={user}>
                <TitleSection title={t(`You are logged in`)} description={t('Welcome to, :app_name', { app_name: 'E-Bebas Pustaka ITS' })} />
                <div id="container" className="flex lg:flex-row flex-col-reverse gap-x-4 gap-y-4">
                    <div className="w-full flex flex-col gap-y-4">
                        <ContentSection title={t('Final Project')}>
                            <div className="md:text-lg text-lg border-l-4 pl-4 border-blue-500 font-semibold mb-2 md:max-w-[90%]">{capitalizeFirstLetter(student.final_project)}</div>
                            <div className="w-full flex flex-col gap-y-4">
                                <div className="flex md:flex-row flex-col gap-y-4 md:gap-x-12 gap-x-2">
                                    <div className="">
                                        <div className="md:text-sm text-xs text-gray-500">{t('Degree')}</div>
                                        <div className="md:text-md text-sm"> {t(capitalizeFirstLetter(student.degree))} </div>
                                    </div>
                                    <div className="">
                                        <div className="md:text-sm text-xs text-gray-500">{t('Faculty')}</div>
                                        <div className="md:text-md text-sm"> {capitalizeFirstLetter(student.faculty)}</div>
                                    </div>
                                    <div className="">
                                        <div className="md:text-sm text-xs text-gray-500">{t('Department')}</div>
                                        <div className="md:text-md text-sm"> {capitalizeFirstLetter(student.department)}</div>
                                    </div>
                                </div>
                                <div className="flex md:flex-row flex-col gap-y-4 gap-x-12">
                                    <div>
                                        <div className="md:text-sm text-xs text-gray-500">{t('Repository')}</div>
                                        {student.repository_code ?
                                            <a href={student.repository_code} className="underline text-blue-500 md:text-md text-sm" target="_blank" rel="noopener noreferrer">
                                                {student.repository_code}
                                            </a> : '-'
                                        }
                                    </div>
                                    <div>
                                        <div className="md:text-sm text-xs text-gray-500">Status</div>
                                        <div className={`rounded px-2 py-2 font-semibold cursor-default w-fit md:text-md text-sm ${statusClass(student.verification.id)}`}>
                                            {t(`${student.verification.name}`)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ContentSection>
                        <ContentSection title={t('Services, :name', { name: 'ITS' })}>
                            <div className="h-fit">
                                <div className="flex md:flex-row flex-col gap-y-4 gap-x-4">
                                    <a href="https://repository.its.ac.id" target="__blank"
                                        className="flex items-center gap-x-2 hover:bg-slate-100 px-4 py-2 duration-300 rounded cursor-pointer">
                                        <img className="w-[60px] h-auto" src="/img/e-thesis.svg"
                                            alt="" />
                                        <div className="">
                                            <div className="font-semibold">Repository ITS</div>
                                            <div className="text-xs text-neutral">{'ITS repository services'}</div>
                                        </div>
                                    </a>
                                    <a href="https://printing.its.ac.id/dashboard" target="__blank"
                                        className="flex items-center gap-x-2 hover:bg-slate-100 px-4 py-2 duration-300 rounded cursor-pointer">
                                        <img className="w-[60px] h-auto" src="/img/myits-printing.png"
                                            alt="" />
                                        <div className="">
                                            <div className="font-semibold">MyITS Printing</div>
                                            <div className="text-xs text-neutral">{'ITS printing services'}</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </ContentSection>
                    </div>

                    <ContentSection className="lg:w-1/2 w-full h-fit" title={t('Notifications')}>
                        <div className="flex flex-col gap-y-2 lg:max-h-[50vh] max-h-[30vh] overflow-y-auto">
                            {notifications.length > 0 ?
                                notifications.map((notification, index) => (
                                    <div className="py-4 md:px-4 flex gap-x-4 w-full h-full text-gray-500 border-b">
                                        <div className="w-full">
                                            <div className="flex items-center justify-between mb-2">
                                                <div id="status" className={`${notification.is_rejected == true ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'} text-sm  px-3 py-1 rounded-lg font-semibold`}>
                                                    {notification.is_rejected == true ? t('Rejected') : t('Accepted')}
                                                </div>
                                                <div className="">
                                                    <div className="text-end text-xs">{dayjs(notification.verification_date).fromNow()}</div>
                                                </div>
                                            </div>
                                            <div id="message" className="text-xs text-wrap text-neutral px-2 py-1">
                                                {notification.message ? t(notification.message) : t('Admin has updated your status from :from to :to', { from: t(notification.verification_status.name), to: t(student.verification.name) })}
                                            </div>
                                            <div className="px-2 flex items-center gap-x-2 text-xs mt-2 text-neutral">
                                                <FaUser />
                                                <div className="">{notification.staff.user.name ? notification.staff.user.name : 'Admin'}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                :
                                <span className="text-sm text-gray-500">No notifications</span>
                            }
                        </div>
                    </ContentSection>
                </div>


            </DashboardLayout>
        </>
    );
}

export default Dashboard;