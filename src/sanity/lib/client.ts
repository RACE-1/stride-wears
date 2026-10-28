import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from '../env';

export const isSanityConfigured =
  Boolean(projectId) &&
  projectId !== 'nike-store-demo' &&
  projectId !== 'your-project-id';

export const client = createClient({
  projectId: isSanityConfigured ? projectId : 'nike-store-demo',
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
});
