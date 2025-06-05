import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { TitleSection } from "../Partials/TitleSection";
import { Timeline } from "@/Components/Timeline/Timeline";
import { ContentSection } from "../Partials/ContentSection";
import { Button } from "@/Components/Button/Button";
import { FaEnvelopeOpenText } from "react-icons/fa6";

const Letter = ({ user, verifications, student }) => {
    const { t } = useLaravelReactI18n();

    return (
        <>
            <DashboardLayout user={user}>
                <TitleSection title={t(`Menu, :menu_name`, { menu_name: t('Letter') })} description={t('You can monitor the submission of letters and download letters')} />
                <div className="flex flex-col gap-y-4">
                    <ContentSection>
                        <div className="flex flex-col w-full rounded">
                            <div className="text-md text-gray-500">{t('Submission Status')}</div>
                            <div className="flex md:justify-center lg:pl-0 md:pl-12 md:py-0 py-4">
                                <Timeline items={verifications} status={student.verification_status_id} />
                            </div>
                        </div>
                    </ContentSection>
                    <ContentSection>
                        <div className="flex flex-col w-full rounded">
                            <div className="text-md text-gray-500">{t('E-BP Letter')}</div>
                            <div className="flex md:justify-center lg:pl-0 md:pl-12 md:py-0 py-4">
                                {student.verification_status_id != 6 ?
                                    t('Unable to download file. Your status is incomplete')
                                    :
                                    <a target="_blank" rel="noopener noreferrer" href={`/letter/download?studentId=${student.id}`}>
                                        <Button label={t('Generate') + ' ' + t('Letter')} Icon={<FaEnvelopeOpenText />} />
                                    </a>
                                }
                            </div>
                        </div>
                    </ContentSection>
                </div>
            </DashboardLayout>
        </>
    );
}

export default Letter;