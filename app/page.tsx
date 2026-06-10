import PageClient from './page-client';
import { getServices, getProjects } from '@/lib/cms';
import { getDocuments } from '@/lib/cms';

export default async function Home() {
  // Load CMS data server-side
  const services = await getServices();
  const projects = await getProjects();

  // Pass CMS data to client component
  return <PageClient services={services} projects={projects} />;
}
