import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { TitleSection } from "./Dashboard/Partials/TitleSection";
import { LetterLayout } from "@/Layouts/LetterLayout";

const LetterPreview = ({ user, student, letter }) => {
    const { t } = useLaravelReactI18n();

    return (
        <>
            <DashboardLayout user={user}>
                <TitleSection title={t(`Menu, :menu_name`, { menu_name: t('Letter') })} />
                <div id="container" className="flex lg:flex-row flex-col gap-x-4 gap-y-4">
                    <div className="flex flex-col gap-y-4">
                        <div className="xl:px-64 flex flex-col gap-y-4">
                            <LetterLayout student={student} letter={letter} />
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}

export default LetterPreview;