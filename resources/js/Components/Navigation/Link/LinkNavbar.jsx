import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

export const LinkNav = React.memo((props) => {
    const { icon, label, href, ssr = true } = props;
    const { t } = useLaravelReactI18n();

    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            const newPath = hash ? `#${hash.substring(1)}` : window.location.pathname;
            setPath(newPath);
        };

        handleHashChange();

        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const isActive = path.toLowerCase() === href.toLowerCase() || href.toLowerCase() === `#home` && path === '/';
    const translatedLabel = t(`${label}`) || label;

    const linkClasses = classNames('flex items-center gap-x-2 md:text-base text-sm', {
        'text-blue-500': isActive,
        'text-gray-700 hover:text-blue-500': !isActive,
    });

    return (
        <div>
            {ssr ? (
                <Link className={linkClasses} href={href} aria-current={isActive ? 'page' : undefined}>
                    {icon}
                    <h1>{translatedLabel}</h1>
                </Link>
            ) : (
                <a className={linkClasses} href={href} aria-current={isActive ? 'page' : undefined}>
                    {icon}
                    <h1>{translatedLabel}</h1>
                </a>
            )}
        </div>
    );
});