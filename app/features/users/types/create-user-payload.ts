import { z } from 'zod';

export const createUserPayloadSchema = z.object({
  type: z.string().refine((value) => value === 'user.created'),
  object: z.string().refine((value) => value === 'event'),
  data: z.object({
    id: z.string(),
    email_addresses: z
      .array(
        z.object({
          email_address: z.string(),
        })
      )
      .nonempty(),
  }),
});
