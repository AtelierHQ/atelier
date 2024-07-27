import { Home, Package, ShoppingCart } from 'lucide-react';
import { AllIdeas } from '../modules';

const navigationItems = [
    {
        icon: Home,
        link: 'all-ideas',
        title: 'All Ideas',
    },
    {
        icon: ShoppingCart,
        link: 'impact-assessment',
        title: 'Impact Assessment',
    },
    {
        icon: Package,
        link: 'product-roadmap',
        title: 'Product Roadmap',
    },
];

const routes = [
    {
        path: 'all-ideas',
        routeComponent: AllIdeas,
    },
    {
        path: 'impact-assessment',
        routeComponent: AllIdeas,
    },
    {
        path: 'product-roadmap',
        routeComponent: AllIdeas,
    },
];

export { navigationItems, routes };
