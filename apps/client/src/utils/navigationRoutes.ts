import { Lightbulb, LucidePresentation, Package } from 'lucide-react';
import { AllIdeas } from '../modules';
import { ProductRoadmap } from '../modules/product-roadmap';
import { Whiteboard } from '../modules/whiteboard';

const navigationItems = [
  {
    icon: Lightbulb,
    link: 'all-ideas',
    title: 'All Ideas',
  },
  {
    icon: Package,
    link: 'product-roadmap',
    title: 'Product Roadmap',
  },
  {
    icon: LucidePresentation,
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
    path: 'product-roadmap',
    routeComponent: ProductRoadmap,
  },
  {
    path: 'whiteboard',
    routeComponent: Whiteboard,
  },
];

export { navigationItems, routes };
