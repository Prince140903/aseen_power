import PageClient from './page-client';
import { getServices, getProjects, getSettings } from '@/lib/cms';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Load CMS data server-side
  const services = await getServices();
  const projects = await getProjects();
  const settings = await getSettings();

  // Pass CMS data to client component
  return <PageClient services={services} projects={projects} settings={settings} />;
}
