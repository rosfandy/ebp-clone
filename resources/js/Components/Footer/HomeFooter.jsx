import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa6';
import { LinkNav } from '../Navigation/Link/LinkNavbar';

export const HomeFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer footer-center text-base-content rounded p-10 border-t flex flex-col gap-y-10">
            <div className="flex justify-center">
                <nav className=" grid grid-flow-col gap-4">
                    <LinkNav href="#home" label="Home" />
                    <LinkNav href="#services" label="Services" />
                </nav>
            </div>
            <nav>
                <div className="flex justify-center">
                    <div className="flex gap-4">
                        <a href="https://www.youtube.com/channel/UCjx4LnckEmsvkifJdY4bF7Q" className="text-3xl hover:text-blue-500" aria-label='youtube'>
                            <FaYoutube />
                        </a>
                        <a href="https://www.facebook.com/perpustakaanITS" className="text-3xl hover:text-blue-500" aria-label='facebook'>
                            <FaFacebook />
                        </a>
                        <a href="https://x.com/perpustakaanits" className="text-3xl hover:text-blue-500" aria-label='twitter'>
                            <FaTwitter />
                        </a>
                        <a href="https://www.instagram.com/its.library/" className="text-3xl hover:text-blue-500" aria-label='instagram'>
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </nav>
            <div className="flex justify-center w-full">
                <div className=" w-full flex justify-center text-center">
                    <p>Copyright © {currentYear} - Institut Teknologi Sepuluh Nopember</p>
                </div>
            </div>
        </footer>
    );
}