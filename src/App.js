import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ContentProvider, usePages } from './framework/ContentProvider';
import { getTemplate } from './framework/TemplateRegistry';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './plugins/index';

const PageRoutes = () => {
    const pages = usePages();
    return (
        <Routes>
            {Object.entries(pages).map(([route, page]) => {
                const Template = getTemplate(page.frontmatter.template);
                return <Route key={route} path={route} element={<Template page={page} />} />;
            })}
        </Routes>
    );
};

const App = () => (
    <Router>
        <ContentProvider>
            <>
                <Navbar />
                <main className="app-content">
                    <PageRoutes />
                </main>
                <Footer />
            </>
        </ContentProvider>
    </Router>
);

export default App;
