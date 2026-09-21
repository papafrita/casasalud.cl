import { requireProvider } from '@/lib/auth';
import ConnectionsClient from './ConnectionsClient';

export default async function ConnectionsPage() {
    await requireProvider();

    return <ConnectionsClient />;
}
