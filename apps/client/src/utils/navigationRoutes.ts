import { Home, Package, PresentationIcon, ShoppingCart } from 'lucide-react';
import { AllIdeas, Whiteboard } from '../modules';
import ImpactAssessment from '../modules/impact-assessment';
import { ProductRoadmap } from '../modules/product-roadmap';

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
  {
    icon: PresentationIcon,
    link: 'whiteboard',
    title: 'Whiteboard',
  },
];

const routes = [
  {
    path: 'all-ideas',
    routeComponent: AllIdeas,
  },
  {
    path: 'impact-assessment',
    routeComponent: ImpactAssessment,
  },
  {
    path: 'product-roadmap',
    routeComponent: ProductRoadmap,
  },
  {
    path: 'whiteboard',
    routeComponent: Whiteboard,
  },
];

export { navigationItems, routes };
