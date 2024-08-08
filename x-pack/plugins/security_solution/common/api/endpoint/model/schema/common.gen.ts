/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

/*
 * NOTICE: Do not edit this file manually.
 * This file is automatically generated by the OpenAPI Generator, @kbn/openapi-generator.
 *
 * info:
 *   title: Common Endpoint Attributes
 *   version: 2023-10-31
 */

import { z } from 'zod';

import { AlertIds } from '../../../model/alert.gen';

export type Id = z.infer<typeof Id>;
export const Id = z.string();

export type IdOrUndefined = z.infer<typeof IdOrUndefined>;
export const IdOrUndefined = Id.nullable();

/**
 * Page number
 */
export type Page = z.infer<typeof Page>;
export const Page = z.number().int().min(1).default(1);

/**
 * Number of items per page
 */
export type PageSize = z.infer<typeof PageSize>;
export const PageSize = z.number().int().min(1).max(100).default(10);

/**
 * Start date
 */
export type StartDate = z.infer<typeof StartDate>;
export const StartDate = z.string();

/**
 * End date
 */
export type EndDate = z.infer<typeof EndDate>;
export const EndDate = z.string();

/**
 * Agent ID
 */
export type AgentId = z.infer<typeof AgentId>;
export const AgentId = z.string();

export type AgentIds = z.infer<typeof AgentIds>;
export const AgentIds = z.union([z.array(z.string().min(1)).min(1).max(50), z.string().min(1)]);

/**
 * The command to be executed (cannot be an empty string)
 */
export type Command = z.infer<typeof Command>;
export const Command = z.enum([
  'isolate',
  'unisolate',
  'kill-process',
  'suspend-process',
  'running-processes',
  'get-file',
  'execute',
  'upload',
  'scan',
]);
export type CommandEnum = typeof Command.enum;
export const CommandEnum = Command.enum;

export type Commands = z.infer<typeof Commands>;
export const Commands = z.array(Command);

/**
 * The maximum timeout value in milliseconds (optional)
 */
export type Timeout = z.infer<typeof Timeout>;
export const Timeout = z.number().int().min(1);

export type Status = z.infer<typeof Status>;
export const Status = z.enum(['failed', 'pending', 'successful']);
export type StatusEnum = typeof Status.enum;
export const StatusEnum = Status.enum;

export type Statuses = z.infer<typeof Statuses>;
export const Statuses = z.array(Status);

/**
 * User IDs
 */
export type UserIds = z.infer<typeof UserIds>;
export const UserIds = z.union([z.array(z.string().min(1)).min(1), z.string().min(1)]);

/**
 * Shows detailed outputs for an action response
 */
export type WithOutputs = z.infer<typeof WithOutputs>;
export const WithOutputs = z.union([z.array(z.string().min(1)).min(1), z.string().min(1)]);

/**
 * Type of response action
 */
export type Type = z.infer<typeof Type>;
export const Type = z.enum(['automated', 'manual']);
export type TypeEnum = typeof Type.enum;
export const TypeEnum = Type.enum;

/**
 * List of types of response actions
 */
export type Types = z.infer<typeof Types>;
export const Types = z.array(Type);

/**
 * List of endpoint IDs (cannot contain empty strings)
 */
export type EndpointIds = z.infer<typeof EndpointIds>;
export const EndpointIds = z.array(z.string().min(1)).min(1);

/**
 * Case IDs to be updated (cannot contain empty strings)
 */
export type CaseIds = z.infer<typeof CaseIds>;
export const CaseIds = z.array(z.string().min(1)).min(1);

/**
 * Optional comment
 */
export type Comment = z.infer<typeof Comment>;
export const Comment = z.string();

/**
 * Optional parameters object
 */
export type Parameters = z.infer<typeof Parameters>;
export const Parameters = z.object({});

export type AgentTypes = z.infer<typeof AgentTypes>;
export const AgentTypes = z.enum(['endpoint', 'sentinel_one', 'crowdstrike']);
export type AgentTypesEnum = typeof AgentTypes.enum;
export const AgentTypesEnum = AgentTypes.enum;

export type BaseActionSchema = z.infer<typeof BaseActionSchema>;
export const BaseActionSchema = z.object({
  endpoint_ids: EndpointIds,
  alert_ids: AlertIds.optional(),
  case_ids: CaseIds.optional(),
  comment: Comment.optional(),
  parameters: Parameters.optional(),
  agent_type: AgentTypes.optional(),
});

export type NoParametersRequestSchema = z.infer<typeof NoParametersRequestSchema>;
export const NoParametersRequestSchema = z.object({
  body: BaseActionSchema,
});

export type KillOrSuspendActionSchema = z.infer<typeof KillOrSuspendActionSchema>;
export const KillOrSuspendActionSchema = BaseActionSchema.merge(
  z.object({
    parameters: z.union([
      z.object({
        pid: z.number().int().min(1).optional(),
      }),
      z.object({
        entity_id: z.string().min(1).optional(),
      }),
    ]),
  })
);

export type ProtectionUpdatesNoteResponse = z.infer<typeof ProtectionUpdatesNoteResponse>;
export const ProtectionUpdatesNoteResponse = z.object({
  note: z.string().optional(),
});

export type SuccessResponse = z.infer<typeof SuccessResponse>;
export const SuccessResponse = z.object({});
