import { createClerkClient } from '@clerk/remix/api.server';

export const clerkClient = createClerkClient({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
});
