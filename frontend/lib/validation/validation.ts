import { z } from 'zod';

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type UserLoginSchemaValues = z.infer<typeof userLoginSchema>;

export const newBountySchema = z.object({
  title: z.string(),
  description: z.string(),
  target: z.string(),
  planet: z.string(),
  reward: z.coerce
    .number()
    .positive("Must be a positive number, we don't do charity work here"),
});

export type NewBountySchemaValues = z.infer<typeof newBountySchema>;

export const allBountiesResponseSchema = z.object({
  title: z.string(),
  target: z.string(),
  planet: z.string(),
  reward: z.number(),
  id: z.number(),
  claimedBy:
    z.object({
      id: z.number(),
    }) || null,
});

export type AllBountiesResponseSchemaValues = z.infer<
  typeof allBountiesResponseSchema
>[];

export const detailedBountyResponseSchema = z.object({
  title: z.string(),
  target: z.string(),
  planet: z.string(),
  description: z.string(),
  reward: z.number(),
  id: z.number(),
  claimedBy:
    z.object({
      id: z.number(),
      email: z.string(),
    }) || null,
  createdBy:
    z.object({
      id: z.number(),
      email: z.string(),
    }) || null,
});

export type DetailedBountyResponseSchemaValues = z.infer<
  typeof detailedBountyResponseSchema
>;
