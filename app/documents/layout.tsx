import { getDocuments } from '@/lib/cms';
import DocumentsPageWrapper from './page-client';

export const dynamic = 'force-dynamic';

export default async function DocumentsLayout() {
  const documents = await getDocuments();

  return <DocumentsPageWrapper documents={documents} />;
}
