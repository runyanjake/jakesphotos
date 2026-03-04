import CarouselTemplate from '../templates/CarouselTemplate';
import CollectionTemplate from '../templates/CollectionTemplate';
import CollectionIndexTemplate from '../templates/CollectionIndexTemplate';
import DefaultTemplate from '../templates/DefaultTemplate';
import ContactTemplate from '../templates/ContactTemplate';
import HomepageTemplate from '../templates/HomepageTemplate';
import MenuTemplate from '../templates/MenuTemplate';

const registry = {
    carousel: CarouselTemplate,
    collection: CollectionTemplate,
    'collection-index': CollectionIndexTemplate,
    default: DefaultTemplate,
    contact: ContactTemplate,
    homepage: HomepageTemplate,
    menu: MenuTemplate,
};

export const getTemplate = (name) => registry[name] || registry['default'];

export const registerTemplate = (name, Component) => {
    registry[name] = Component;
};
