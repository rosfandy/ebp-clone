import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { TitleSection } from "../Partials/TitleSection";
import { ContentSection } from "../Partials/ContentSection";
import { Table } from "@/Components/Table/Table";

const Member = ({ user, staff, pagination }) => {
    const { t } = useLaravelReactI18n();
    const fields = ['name', 'email', 'phone', 'authority', 'role', 'edit_action',];
    const aliases = { name: 'Name', email: 'Email', phone: 'Phone', role: 'Roles', edit_action: 'Action' };
    console.log(staff)
    return (
        <>
            <DashboardLayout user={user}>
                <TitleSection title={t(`Menu, :menu_name`, { menu_name: t('Member') })} description={t('You can manage all, :menu_name, such as editing and more', { menu_name: t('Member') })} />
                <div id="container">
                    <ContentSection >
                        <div className="flex justify-between">
                            <div className="text-sm text-gray-500">{t('List of, :data_name', { data_name: t('Staff') })}</div>
                        </div>
                        <Table datas={staff} fields={fields} aliases={aliases} pagination={pagination} />
                    </ContentSection>
                </div>
            </DashboardLayout>

        </>
    );
}

export default Member;