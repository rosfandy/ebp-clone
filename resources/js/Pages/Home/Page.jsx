import { Button } from "@/Components/Button/Button";
import { HomeLayout } from "@/Layouts/HomeLayout"
import { useLaravelReactI18n } from "laravel-react-i18n";
import { Stages } from "./Partials/Stages";
import { Services } from "./Partials/Services";
import { Section } from "./Partials/Section";

const Home = () => {
    const { t } = useLaravelReactI18n();
    const stages = [
        {
            number: "1",
            title: t('Register'),
            description: t('Students register as users at E-Bebas Pustaka')
        },
        {
            number: "2",
            title: t('Upload'),
            description: t('Students upload final assignments via the ITS Repository')
        },
        {
            number: "3",
            title: t('Print Book'),
            description: t('Students print books at MyITS Printing or independently and send the hard copy to the Library')
        },
        {
            number: "4",
            title: t('Submission'),
            description: t('Students carry out periodic checks on Final Project submissions')
        },
        {
            number: "5",
            title: t('Download'),
            description: t('Students can download the Bebas Pustaka letter')
        }
    ];

    return (
        <>
            <HomeLayout>
                <div className="xl:pt-0 pt-0">
                    {/* SECTION 1 */}
                    <div id="home" className="flex md:pt-40 pt-24 pb-28 xl:px-24 md:px-12 px-8 mb-12">
                        <div className="xl:w-2/3 w-full flex flex-col xl:pt-8 pt-12 gap-y-6 md:px-12">
                            <div className="flex flex-col xl:gap-y-12 gap-y-4">
                                <div className="font-bold xl:text-[48px] text-4xl">E-Bebas Pustaka ITS</div>
                                <div className="xl:text-lg md:text-sm text-sm text-gray-500">
                                    {t('e-Bebas Pustaka ITS is an application used by ITS students to apply for a free status from borrowing collections and administrative fines for borrowing at the ITS Library. This free library status is integrated with SIM Yudisium, so that it is no longer necessary to issue a free library certificate either in printed or digital form.')}.
                                </div>
                            </div>
                            <div className="">
                                <a href="/dashboard">
                                    <Button size="medium" label={t('Submission')} />
                                </a>
                            </div>
                        </div>
                        <div
                            className="xl:w-1/2 w-2/3 xl:px-24 px-12 lg:flex flex-col items-center xl:pt-0 lg:pt-8 justify-center hidden ">
                            <img className="w-[70vh]" src="/img/illust.svg" alt="e-bp" />
                        </div>
                    </div>

                    <Section id="guide"
                        title={t('Guides')}
                        description={t('Guides') + ' Video E-Bebas Pustaka ITS'}
                        className="md:mx-8 bg-[#f2f7ff] md:rounded-t-[140px] rounded-t-[80px] justify-center flex py-16">
                        <div className="flex flex-col">
                            <div className="">
                                <iframe className="rounded-xl lg:w-[600px] lg:h-[400px] md:w-[500px] md:h-[300px] border-none"
                                    src={'/video/guideline.mp4'} title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen></iframe>
                            </div>
                        </div>
                    </Section>

                    <Section id="stages"
                        title={t('Steps')}
                        description={t('The following are the steps that must be taken to obtain a Bebas Pustaka Letter')}
                        className="mx-8 justify-center flex py-16">
                        <div className="flex flex-col">
                            <div className="">
                                <div className="flex flex-col">
                                    {stages.map(stage => (
                                        <Stages
                                            key={stage.number}
                                            number={stage.number}
                                            title={stage.title}
                                            description={stage.description}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Section>

                    <Section id="services"
                        title={t('Services')}
                        description={t('The following are services that can be accessed to process Bebas Pustaka letter')}
                        className="mx-8 justify-center flex pt-24 pb-16 bg-primary-2 md:rounded-t-[140px] rounded-t-[80px]">
                        <div className="flex flex-col justify-center items-center ">
                            <div className="flex md:flex-row justify-center flex-col md:gap-x-20">
                                <Services href="https://repository.its.ac.id/"
                                    img="/img/e-thesis.png" title="Repository ITS"
                                    desc={t('ITS repository services')} />
                                <Services href="https://printing.its.ac.id/dashboard"
                                    img="/img/myits-printing.png" title="MyITS Printing"
                                    desc={t('ITS printing services')} />
                                <Services href="http://library.its.ac.id/spits/"
                                    img="/img/literacy.png" title="SPITS"
                                    desc={t('ITS service system')} />
                            </div>
                        </div>
                    </Section>

                    <div className="justify-center flex py-16">
                        <div
                            style={{ backgroundImage: "url('/img/perpus.jpg')" }}
                            className="w-full h-[80vh] bg-cover bg-no-repeat"
                        >
                            <div className="flex flex-col items-center lg:py-24 py-4">
                                <div className="text-white md:text-4xl font-bold">Perpustakaan ITS Surabaya</div>
                                <div className="text-white py-8">
                                    Gedung Perpustakaan, Kampus ITS, JL Raya ITS, Sukolilo, 60111, Keputih, Sukolilo, Kota Surabaya, Jawa Timur 60111
                                </div>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.4072637286975!2d112.7930727!3d-7.2816318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fa16cfc6f083%3A0x80eeb48974d69e31!2sPerpustakaan+ITS!5e0!3m2!1sid!2sid!4v1691064812171!5m2!1sid!2sid"
                                    className="w-[30em] h-[20em] max-w-full rounded-lg border-0"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Map of Perpustakaan ITS Surabaya"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                </div>
            </HomeLayout>
        </>
    )
}

export default Home