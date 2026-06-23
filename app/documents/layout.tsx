import { getDocuments, getSettings } from '@/lib/cms';
import DocumentsPageWrapper from './page-client';

export const dynamic = 'force-dynamic';

export default async function DocumentsLayout() {
  const documents = await getDocuments();
  const settings = await getSettings();

  return <DocumentsPageWrapper documents={documents} settings={settings} />;
}
