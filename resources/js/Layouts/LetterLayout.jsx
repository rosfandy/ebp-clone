import { Button } from '@/Components/Button/Button'
import '@/surat.css'
import { useReactToPrint } from "react-to-print";
import { useRef } from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FaDownload } from 'react-icons/fa6';

export const LetterLayout = ({ student, letter }) => {
    const contentRef = useRef();
    const { currentLocale, t } = useLaravelReactI18n();
    const reactToPrintFn = useReactToPrint({ contentRef, documentTitle: `${student.nrp}_${student.name}_Surat_E-BP` });
    const date = new Date().toLocaleDateString(currentLocale() == 'id' ? 'id-ID' : 'en-US', { day: "numeric", month: "long", year: "numeric" })
    const year = new Date().getFullYear();
    return (
        <>
            <div className="flex justify-center py-4">
                <Button Icon={<FaDownload />} size="medium" label={t('Download') + ' PDF'} onClick={() => reactToPrintFn()} />
            </div>

            <div className="bg-white border shadow-md">
                <div ref={contentRef} className='surat'>
                    <div className="content">
                        <div className="header-img p-4 relative group">
                            <div className="">
                                <img src="/img/header_id.jpg" alt="Header Image" className="img-fluid w-full h-auto" />
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="font-bold text-[16px]">{t('Certificate of Bebas Pustaka').toUpperCase()}</div>
                            <div className="w-full text-center text-[16px] flex justify-center gap-x-2 items-center">
                                <div className="">{t('Number')} :</div>
                                <div className="">
                                    {letter.length > 0 && letter[0].reference_number ? letter[0].reference_number : 0}/
                                    {letter.length > 0 && letter[0].reference_id && letter[0].reference_id}/
                                    {year}
                                </div>
                            </div>
                        </div>

                        <br />
                        <div className="px-4">
                            <div>{t('The undersigned states that:')}</div>
                            <div className="container">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="gap-y">{t('Name')}</td>
                                            <td className="uppercase gap-y">: {student.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="gap-y">NRP</td>
                                            <td className="gap-y">: {student.nrp}</td>
                                        </tr>
                                        <tr>
                                            <td className="gap-y">{t('Department')}</td>
                                            <td className="uppercase gap-y">: {student.department}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div>{t('based on our data, it meets the requirements for Bebas Pustaka:')}</div>
                            <div className="py-2 px-4">
                                <div className="mb-1">1. {t('Submit Hardcopy and Softcopy of TA/Thesis/Dissertation')}.</div>
                                <div>2. {t('Free of Collection and Administration Loan Liability at the Sepuluh Nopember Institute of Technology (ITS) Library, Surabaya')}.</div>
                            </div>
                            <br />
                            <div>{t('Thus this letter of information is given to be used as it should')}.</div>

                            <br />
                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="flex flex-col gap-y-2 items-end ">
                                                <div className="">
                                                    <div className="">
                                                        Surabaya, {date}
                                                    </div>
                                                    <div className="">
                                                        {t('Head')},
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="text-right">
                                            <div className="flex justify-end">
                                                <div className="flex justify-center  p-4 relative group">
                                                    <img src="/img/ttd.jpg" alt="Signature Image" className="signature" />
                                                </div>
                                            </div>
                                            <span x-show="errorTTD" className="text-red-500 text-sm" x-text="errorTTD"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-right py-2">
                                            {letter[0] && letter[0].name_of_head}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-right">
                                            NIP. {' '} {letter[0] && letter[0].nip_of_head}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}