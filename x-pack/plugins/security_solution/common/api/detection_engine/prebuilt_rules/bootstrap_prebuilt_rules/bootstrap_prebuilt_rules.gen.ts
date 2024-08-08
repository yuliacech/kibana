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
 *   title: Bootstrap Prebuilt Rules API endpoint
 *   version: 1
 */

import { z } from 'zod';

export type PackageInstallStatus = z.infer<typeof PackageInstallStatus>;
export const PackageInstallStatus = z.object({
  /**
   * The name of the package
   */
  name: z.string(),
  /**
   * The version of the package
   */
  version: z.string(),
  /**
   * The status of the package installation
   */
  status: z.enum(['installed', 'already_installed']),
});

export type BootstrapPrebuiltRulesResponse = z.infer<typeof BootstrapPrebuiltRulesResponse>;
export const BootstrapPrebuiltRulesResponse = z.object({
  /**
   * The list of packages that were installed or upgraded
   */
  packages: z.array(PackageInstallStatus),
});
