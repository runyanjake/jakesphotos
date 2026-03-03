import React, { createContext, useContext } from 'react';
import { siteConfig, pages } from '../generated/content';

const SiteConfigContext = createContext(siteConfig);
const PagesContext = createContext(pages);

export const ContentProvider = ({ children }) => (
    <SiteConfigContext.Provider value={siteConfig}>
        <PagesContext.Provider value={pages}>
            {children}
        </PagesContext.Provider>
    </SiteConfigContext.Provider>
);

export const useSiteConfig = () => useContext(SiteConfigContext);
export const usePages = () => useContext(PagesContext);
