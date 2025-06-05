
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaSave } from "react-icons/fa";
import "./style.css"
import { FormPopup } from "@/Components/Popup/FormPopup";

export const EditAction = (props) => {
    const { fields, aliases, data, t, id } = props;
    const [isEditPrompt, setIsEditPrompt] = useState(false);
    const [verifications, setVerifications] = useState([]);

    useEffect(() => {
        fetchAuthority()
    }, [])

    const fetchAuthority = async () => {
        try {
            const response = await fetch(`/api/authority/staff/${data.id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setVerifications(result.verifications);
        } catch (error) {
            console.log("Error fetching authority:", error);
        }
    };

    return (
        <>
            <div onClick={() => setIsEditPrompt(true)} className="flex items-center gap-x-2 text-blue-500 cursor-pointer">
                <div className="flex items-center gap-x-2 hover:border-b hover:border-blue-400 duration-200">
                    <FaPencilAlt />
                    <span>{t('Edit')}</span>
                </div>
            </div>

            <AnimatePresence>
                {isEditPrompt && (
                    <FormPopup fields={fields} aliases={aliases} data={data} id={id} setIsShow={setIsEditPrompt} verifications={verifications} />
                )}
            </AnimatePresence>
        </>
    )
}