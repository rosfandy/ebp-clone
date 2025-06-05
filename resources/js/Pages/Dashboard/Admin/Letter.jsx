import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { TitleSection } from "../Partials/TitleSection";
import { FaCircleInfo } from "react-icons/fa6";
import { Callout } from "@/Components/Callout/Callout";
import { LetterEdit } from "../Partials/LetterEdit";


const Letter = ({ user, letter }) => {
    const { t } = useLaravelReactI18n();

    return (
        <>
            <DashboardLayout user={user}>
                <TitleSection title={t(`Menu, :menu_name`, { menu_name: t('Letter') })} description={t('You can edit the letter template in bounding box components')} />
                <div className="flex flex-col gap-y-4">
                    <div className="xl:px-64 flex flex-col gap-y-4">
                        <Callout Icon={<FaCircleInfo className="text-gray-500" />} title={t('The maximum size of the :name is :size', { name: t('Letterhead'), size: '961 x 225 px' })}>
                            <div className="mt-2 text-sm">
                                <a className="text-blue-500 underline" href="/img/header_id.jpg" download >
                                    {t('Example') + ' '}{t('Letterhead')}</a>
                            </div>
                        </Callout>
                        <Callout Icon={<FaCircleInfo className="text-gray-500" />} title={t('The maximum size of the :name is :size', { name: t('Signature'), size: '380 x 251 px' })}>
                            <div className="mt-2 text-sm">
                                <a className="text-blue-500 underline" href="/img/ttd.jpg" download >
                                    {t('Example') + ' '}{t('Signature')}</a>
                            </div>
                        </Callout>
                        <div className="bg-white">
                            <LetterEdit letter={letter} />
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}

export default Letter;