import { createRootRoute, createRoute } from '@tanstack/react-router';
import Layout from '../components/Layout/Layout';
import { CreateContactPage } from '../pages/CreateContactPage/index';
import { ContactDetailsPage } from '../pages/ContactDetailsPage/index';
import { EditContactPage } from '../pages/EditContactPage/EditContactPage';

const rootRoute = createRootRoute({
  component: Layout,
});

const contactDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'contact/$userId',
  component: ContactDetailsPage,
});

const createContactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create',
  component: CreateContactPage,
});

const editContactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact/edit/$userId',
  component: EditContactPage,
});

export const routeTree = rootRoute.addChildren([
  contactDetailRoute,
  createContactRoute,
  editContactRoute,
]);
