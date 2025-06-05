import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { LaravelReactI18nProvider } from 'laravel-react-i18n';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './Store';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Provider store={store}>
                <LaravelReactI18nProvider
                    locale='id'
                    fallbackLocale='en'
                    files={import.meta.glob('/lang/*.json')}
                >
                    <App {...props} />
                    <ToastContainer theme="light" position='top-right' autoClose={3000} hideProgressBar={false} />
                </LaravelReactI18nProvider>
            </Provider>
        );
    },
    progress: {
        color: '#3B82F6',
    },

});