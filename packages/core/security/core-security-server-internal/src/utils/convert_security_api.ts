/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { CoreSecurityDelegateContract } from '@kbn/core-security-server';
import type { InternalSecurityServiceStart } from '../internal_contracts';

export const convertSecurityApi = (
  privateApi: CoreSecurityDelegateContract
): InternalSecurityServiceStart => {
  // shapes are the same for now given we only have one API exposed.
  return privateApi;
};
