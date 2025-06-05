import { useLaravelReactI18n } from "laravel-react-i18n";
import { TextInput } from "../Input/Text/TextInput";
import { router } from "@inertiajs/react";
import classNames from "classnames";
import { VerificationAction } from "./Action/VerificationAction";
import { EditAction } from "./Action/EditAction";
import { capitalizeFirstLetter } from "@/Utils/utils";

export const Table = (props) => {
    const { t } = useLaravelReactI18n();
    const LIMIT = 20
    const {
        datas,
        fields,
        aliases,
        pagination = null,
        useSearch = true,
        placeholder = t('Search'),
        id = null
    } = props;

    const renderedFields = fields
        .filter(field => aliases[field] !== undefined)
        .map(field => field);

    const handleSearch = (param) => {
        const searchUrl = `${window.location.pathname}/search`;
        const data = {
            'search': param
        }
        router.post(searchUrl, data);
    }

    const fieldClass = (field) => {
        return classNames('px-4 py-4 text-sm text-gray-700 w-[50em]', {
            'w-[150em]': field === 'final_project',
        })
    }

    const statusClass = (statusId) => {
        return classNames('w-fit text-center p-2 font-medium rounded-md border ', {
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
            {useSearch &&
                <TextInput onChange={handleSearch} className="py-1" name="name" placeholder={placeholder} label={t('Search')} />
            }
            <div className="overflow-x-auto overflow-y-auto w-full max-h-[50vh] shadow-sm border">
                <table className="min-w-full table-auto">
                    <thead className="sticky top-0 bg-sky-100">
                        <tr className="bg-blue-500/20">
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">#</th>
                            {renderedFields.map((field, index) => (
                                <th key={index} className="p-4 text-left text-sm font-medium text-gray-700">
                                    {aliases[field]}
                                </th>
                            ))}
                            {fields.filter(field => field === 'verification_action') && <th />}
                        </tr>
                    </thead>
                    <tbody>
                        {datas && datas.length > 0 ? (
                            datas.map((data, index) => (
                                <tr key={data['id']} className={`bg-white border-b ${index % 2 !== 0 ? 'bg-blue-500/5' : ''}`}>
                                    <td className="px-4 py-4 w-[10em] text-sm text-gray-700">{(index + 1) + (LIMIT * (pagination && pagination.current_page - 1))}</td>
                                    {renderedFields.map((field, index) => (
                                        <td key={index} className={fieldClass(field)}>
                                            {field === 'verification_status_id' ?
                                                data['verification_status'].id == data['verification_status_id'] &&
                                                <div className={statusClass(data['verification_status'].id)}>
                                                    {t(`${data['verification_status'].name}`)}
                                                </div>
                                                :
                                                field === 'name' ? t(capitalizeFirstLetter(data[field])) : data[field]
                                            }
                                            {field === 'edit_action' && (
                                                <EditAction id={id} fields={fields} aliases={aliases} data={data} t={t} />
                                            )}
                                        </td>
                                    ))}
                                    {fields.includes('verification_action') &&
                                        <td className="text-sm px-4 py-4">
                                            <VerificationAction data={data} t={t} />
                                        </td>
                                    }
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={fields.length + 1} className="px-4 py-4 text-center text-sm text-gray-700">
                                    {t('No data found')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div >


        </>
    );
}