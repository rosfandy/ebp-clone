import { Button } from "@/Components/Button/Button";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { FaCheck, FaPrint, FaX } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { SelectInput } from "@/Components/Input/Select/SelectInput";

export const VerificationAction = ({ data, t }) => {
    const [isAcceptedPrompt, setIsAcceptedPrompt] = useState(false);
    const [isRejectedPrompt, setIsRejectedPrompt] = useState(false);
    const [error, setError] = useState('');

    const actions = [
        { status_id: 1, accept: true, reject: false },
        { status_id: 2, accept: true, reject: true },
        { status_id: 3, accept: true, reject: true },
        { status_id: 4, accept: true, reject: true },
        { status_id: 5, accept: true, reject: true },
        { status_id: 6, accept: false, reject: false },
    ];

    const reasons = [
        { id: 1, name: t('Lembar pengesahan kurang tandatangan/stempel') },
        { id: 2, name: t('Lembar orisinalitas tidak ada') },
        { id: 3, name: t('Halaman kurang lengkap') },
    ]

    const statusAction = actions.find(action => action.status_id == data.verification_status_id);

    const handleAcceptPrompt = () => {
        const payload = {
            verification_status_id: data.verification_status_id,
            is_reject: false
        };

        update(payload);
    };

    const handleRejectPrompt = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let fieldData = Object.fromEntries(formData.entries());

        if (fieldData.message == '') return setError('Pesan wajib diisi');
        const message = reasons.find(reason => reason.id == fieldData.message);

        const payload = {
            verification_status_id: data.verification_status_id,
            is_reject: true,
            message: message.name
        };

        update(payload);
        setError('')
        setIsRejectedPrompt(false);
    };

    const update = (payload) => {
        router.post(`/verification/update/status/${data.id}`, payload);
    };

    return (
        <>
            <div className="flex flex-col gap-y-2">
                {statusAction.accept ? data['verification_status_id'] < 4 ? (
                    <div onClick={() => setIsAcceptedPrompt(true)} className="bg-green-100 text-green-500 border border-green-300 cursor-pointer hover:bg-green-200 p-2 font-medium rounded-md w-[10em] justify-center items-center flex">
                        <div className="flex items-center gap-x-2">
                            <FaCheck />
                            <div>{t(`${data['verification_status'].name}`)}</div>
                        </div>
                    </div>
                ) : (
                    <div onClick={() => setIsAcceptedPrompt(true)} className="bg-green-100 text-green-500 border border-green-300 cursor-pointer hover:bg-green-200 p-2 font-medium rounded-md w-[10em] justify-center items-center flex">
                        <FaCheck />
                        <div>{t(`Accept`)}</div>
                    </div>
                ) : (
                    <a target="_blank" rel="noopener noreferrer" href={`/letter/download?studentId=${data.id}`} className="bg-green-100 text-green-500 border border-green-300 cursor-pointer hover:bg-green-200 p-2 font-medium rounded-md w-[10em] justify-center items-center flex">
                        <div className="flex items-center gap-x-2">
                            <FaPrint />
                            <div>{t('Print')}</div>
                        </div>
                    </a>
                )}

                {statusAction.reject && (
                    <div onClick={() => { setIsRejectedPrompt(true) }} className="bg-red-100 text-red-500 border border-red-300 cursor-pointer hover:bg-red-200 p-2 font-medium rounded-md w-[10em] justify-center items-center flex">
                        <div className="flex items-center gap-x-2">
                            <FaX />
                            <div>{t(`Reject`)}</div>
                        </div>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {isAcceptedPrompt && (
                    <motion.div
                        className="bg-black/50 w-full h-screen fixed top-0 left-0 z-[999] flex justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="bg-white p-8 rounded-md w-1/4"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div>
                                <div className="flex items-center gap-x-1 pt-2 pb-4 font-[16px]">
                                    {t(`Accept`)} <span className="font-bold">{data.name} ?</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Button onClick={handleAcceptPrompt} size="small" className="w-full" variant="success" label={t('Accept')} />
                                <Button onClick={() => setIsAcceptedPrompt(false)} size="small" className="w-full" variant="slate" label={t('Cancel')} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {isRejectedPrompt && (
                    <motion.div
                        className="bg-black/50 w-full h-screen fixed top-0 left-0 z-[999] flex justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="bg-white p-8 rounded w-1/4"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div>
                                {data['verification_status_id'] < 4 && (
                                    <span>{t(`${data['verification_status'].name}`)}</span>
                                )}
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <div className="flex items-center gap-x-1 text-[16px] pb-4">
                                    <span >{t('Reject')}</span>
                                    <span className="font-bold">{data.name} ?</span>
                                </div>
                                <form onSubmit={handleRejectPrompt} >
                                    {error && <span className="text-red-500 text-xs pb-2">{error}</span>}
                                    <SelectInput datas={reasons} name="message" placeholder={t('Message')} title={t('Message')} />
                                    <Button size="small" className="w-full mt-4" variant="danger" label={t('Reject')} />
                                </form>
                                <Button onClick={() => setIsRejectedPrompt(false)} size="small" className="w-full" variant="slate" label={t('Cancel')} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
