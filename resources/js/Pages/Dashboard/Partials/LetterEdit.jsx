import { Button } from '@/Components/Button/Button'
import '@/surat.css'
import { router } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useRef } from 'react';
import { toast } from 'react-toastify';

export const LetterEdit = ({ letter }) => {
    const contentRef = useRef();
    const { t } = useLaravelReactI18n();
    const year = new Date().getFullYear();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const payload = {
            'reference_id': data.nomor_surat,
            'name_of_head': data.name_of_head,
            'nip_of_head': data.nip_of_head
        }

        router.put('/letter/edit', payload)
    }

    const handleUpload = (event) => {
        const file = event.target.files[0];
        const fileSize = file.size / 1024 / 1024;
        const name = event.target.name;

        if (fileSize > 2) {
            toast.error(t('File size must be less than 2MB'));
            setErrors({ [name]: t('File size must be less than 2MB') });
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        router.post(`/letter/upload/${name}`, formData)
    }

    return (
        <>
            <div ref={contentRef} className='surat'>
                <div className="content">
                    <div className="header-img border-2 border-blue-500/30 border-dashed p-4 relative group">
                        <div className="">
                            <img src={`/img/header_main.jpg?${new Date().getTime()}`} alt="Header Image" className="img-fluid w-full h-auto" />
                            <div
                                className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                            </div>
                            <input name="header" type="file" id="header_surat" onChange={handleUpload}
                                className="absolute inset-0 m-auto text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full h-full"
                            />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="text-center mt-4">
                            <div className="font-bold md:text-lg text-sm">SURAT KETERANGAN BEBAS PUSTAKA</div>
                            <div className="w-full text-center flex justify-center gap-x-2 items-center">
                                <div className="">Nomor :</div>
                                <div className="">{letter.length > 0 && letter[0].reference_number ? letter[0].reference_number : 0} /</div>
                                <input name="nomor_surat" type="text"
                                    defaultValue={letter.length > 0 && letter[0].reference_id ? letter[0].reference_id : ''}
                                    className="border-2 border-blue-500/30 px-2 border-dashed focus:outline-none w-fit"
                                    x-model="kopSurat" />
                                <div className=""> / {year}</div>
                            </div>
                        </div>

                        <br />
                        <div>Yang bertanda tangan di bawah ini menerangkan bahwa:</div>
                        <div className="container">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="gap-y">Nama</td>
                                        <td className="uppercase gap-y">: John Doe</td>
                                    </tr>
                                    <tr>
                                        <td className="gap-y">NRP</td>
                                        <td className="gap-y">: 502720149</td>
                                    </tr>
                                    <tr>
                                        <td className="gap-y">Departemen</td>
                                        <td className="uppercase gap-y">: Teknologi Informasi
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>berdasarkan data kami, sudah memenuhi persyaratan Bebas Pustaka:</div>
                        <div className="py-2 px-4">
                            <div className="mb-1">1. Menyerahkan Hardcopy dan Softcopy TA/Tesis/Disertasi</div>
                            <div>2. Bebas Tanggungan Pinjaman Koleksi dan Administrasi di Perpustakaan Institut Teknologi
                                Sepuluh
                                Nopember (ITS) Surabaya.</div>
                        </div>
                        <br />
                        <div>Demikian surat keterangan ini diberikan untuk dapat digunakan sebagaimana mestinya.</div>

                        <br />
                        <table style={{ width: "100%" }}>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="flex flex-col gap-y-2 items-end ">
                                            <div className="">
                                                <div className="">
                                                    Surabaya, {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                                                </div>
                                                <div className="">
                                                    Kepala,
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="text-right">
                                        <div className="flex justify-end">
                                            <div className="flex justify-center border-2 border-blue-500/30 border-dashed p-4 relative group">
                                                <img src={`/img/ttd_main.jpg?${new Date().getTime()}`} alt="Signature Image" className="signature" />
                                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                                <input name="ttd" type="file" id="file_upload_ttd" onChange={handleUpload}
                                                    className="absolute inset-0 m-auto text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full h-full"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right py-2">
                                        <input name="name_of_head" type="text" defaultValue={letter[0] && letter[0].name_of_head}
                                            className="border-2 border-blue-500/30 px-2 border-dashed focus:outline-none"
                                            x-model="kepalaPerpus" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right">
                                        {'NIP. ' + ' '}
                                        <input name="nip_of_head" type="text" defaultValue={letter[0] && letter[0].nip_of_head}
                                            className="border-2 border-blue-500/30 border-dashed focus:outline-none"
                                            x-model="kepalaNIP" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex justify-center font-sans">
                            <Button size="small" label={t('Save')} />
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}