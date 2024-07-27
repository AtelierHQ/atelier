import { Home, Package, ShoppingCart } from 'lucide-react';
import Editor from '../components/editor';
import { AllIdeas } from '../modules';
import ImpactAssessment from '../modules/impact-assessment';
import ProductRoadmap from '../modules/product-roadmap';

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
    routeComponent: ImpactAssessment,
  },
  {
    path: 'product-roadmap',
    routeComponent: Editor,
  },
  {
    path: 'product-roadmap',
    routeComponent: ProductRoadmap,
  },
];

export { navigationItems, routes };
