import GalleryTemplate from '../templates/GalleryTemplate';
import DefaultTemplate from '../templates/DefaultTemplate';
import ContactTemplate from '../templates/ContactTemplate';
import HomepageTemplate from '../templates/HomepageTemplate';
import MenuTemplate from '../templates/MenuTemplate';

const registry = {
    gallery: GalleryTemplate,
    default: DefaultTemplate,
    contact: ContactTemplate,
    homepage: HomepageTemplate,
    menu: MenuTemplate,
};

export const getTemplate = (name) => registry[name] || registry['default'];

export const registerTemplate = (name, Component) => {
    registry[name] = Component;
};
