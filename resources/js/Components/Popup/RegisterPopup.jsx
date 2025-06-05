import { capitalizeFirstLetter } from '@/Utils/utils';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import React from 'react';
import { Button } from '../Button/Button';
import { motion } from 'framer-motion';

export const RegisterPopup = ({ isOpen, onClose, onConfirm, data }) => {
    if (!isOpen) return null;
    const { t } = useLaravelReactI18n();

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-lg"
            >
                <h2 className="text-lg font-semibold">{t('Confirm Your Data')}</h2>
                <div className="mt-4 border rounded-md">
                    {Object.keys(data).map((key) => (
                        <div className='flex items-center gap-x-4 border-b py-4 px-4' key={key}>
                            <div className="flex items-center gap-x-2 font-medium">
                                <div className="w-[7em]">{t(`${capitalizeFirstLetter(key)}`)} </div>
                                <div className=""> : </div>
                            </div>
                            <div className="max-w-[30em]">
                                {key === 'degree'
                                    ? t(`${capitalizeFirstLetter(data[key])}`)
                                    : capitalizeFirstLetter(data[key])}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-end">
                    <Button size="small" variant="secondary" onClick={onClose} label={t('Cancel')} />
                    <Button size="small" onClick={onConfirm} label={t('Confirm')} />
                </div>
            </motion.div>
        </div>
    );
};