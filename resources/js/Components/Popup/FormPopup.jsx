import { Button } from "@/Components/Button/Button";
import { TextInput } from "@/Components/Input/Text/TextInput";
import { motion } from "framer-motion";
import { FaTrash, FaX } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { router } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";

export const FormPopup = ({ fields, aliases, data = {}, id, setIsShow, verifications = [], title = 'Edit', method = "put" }) => {
    const { t } = useLaravelReactI18n();
    const path = window.location.pathname
    const variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const payload = {
            ...Object.fromEntries(formData.entries()),
            authority: formData.getAll('authority'),
        };

        if (payload.name) payload.name = payload.name.toUpperCase();
        if (payload.code) payload.code = payload.code.toUpperCase();
        if (data.faculty_id) payload.faculty_id = data.faculty_id;

        if (payload.is_admin) {
            payload.is_admin = payload.is_admin === 'admin' ? 1 : 0;
        }

        console.log(payload)
        handleRequest(payload);
    };


    const handleRequest = (payload) => {
        let url = '';

        if (method == 'post') {
            url = `${path}/store`
            if (id !== null) url = `${path}/store/${id}`
            router.post(url, payload);
        } else {
            url = `${path}/update/${data.id}`
            if (id !== null) url = `${path}/update/${id}/${data.id}`
            router.put(url, payload);
        }
        setIsShow(false);
    };

    const handleDelete = () => {
        let urlDelete = `${path}/delete/${data.id}`

        if (id !== null) urlDelete = `${path}/delete/${id}/${data.id}`
        router.delete(urlDelete);
        setIsShow(false);
    }

    const renderAuthorityInput = (verifications, data, t) => (
        <div key={'authority'} className="flex flex-col gap-x-2" >
            {
                verifications.length > 0 && (
                    <div className="flex flex-col gap-y-2">
                        <label>{t("Authority")}</label>
                        {verifications.map((verification) => (
                            <div
                                key={verification.id}
                                className="flex items-center gap-x-2 cursor-pointer"
                                onClick={(e) => e.target.type !== "checkbox" && e.currentTarget.querySelector("input").click()}
                            >
                                <input
                                    type="checkbox"
                                    name="authority"
                                    value={verification.id}
                                    defaultChecked={data.authority?.includes(verification.id)}
                                    className="rounded-md p-2"
                                />
                                <span>{t(verification.name)}</span>
                            </div>
                        ))}
                    </div>
                )
            }
        </div >
    );

    const excludedFields = ["edit_action", "verification_status_id", "department", "faculty_code", "phone", "username", "email"];

    return (
        <motion.div
            className="bg-black/50 w-full h-screen fixed top-0 left-0 z-[999] flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="w-full h-screen fixed top-0 left-0 z-[999] flex justify-center items-center"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={variants}
                transition={{ duration: 0.2 }}
            >
                <div className="bg-white p-8 rounded-md xl:w-1/3 lg:w-1/2 md:w-2/3">
                    <div className="flex justify-between pb-4">
                        <div className="font-bold text-lg">{t(title)}</div>
                        <FaX onClick={() => setIsShow(false)} className="cursor-pointer hover:text-blue-500 duration-200" size={16} />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-y-4">
                            <input type="hidden" name="id" value={data?.id || ''} />
                            {fields.map((field, index) => {
                                if (field == "name" && (path.includes('verification') || path.includes('member'))) return null;
                                if (excludedFields.includes(field)) return null;

                                switch (field) {
                                    case "authority":
                                        return verifications && renderAuthorityInput(verifications, data, t);
                                    case "role":
                                        return (
                                            <select key={index} name="is_admin" defaultValue={data.role} className="border border-gray-300 rounded-md p-2">
                                                <option value="admin">Admin</option>
                                                <option value="staff">Staff</option>
                                            </select>
                                        );
                                    default:
                                        return (
                                            <TextInput
                                                key={index}
                                                title={t(aliases[field])}
                                                name={field}
                                            />
                                        );
                                }
                            })}
                        </div>
                        <Button size="small" type="submit" label={t('Save')} className="w-full mt-8 mb-4" Icon={<FaSave size={16} />} />
                    </form>
                    {method == "put" &&
                        <Button size="small" variant="danger" label={t('Delete')} className="w-full" Icon={<FaTrash size={16} />} onClick={handleDelete} />
                    }
                </div>
            </motion.div>
        </motion.div>
    );
};
