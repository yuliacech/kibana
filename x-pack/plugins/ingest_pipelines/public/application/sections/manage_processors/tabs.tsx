/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { FormattedMessage } from '@kbn/i18n-react';
import { GeoipList } from './geoip_list';

export const GEOIP_ID = 'geoip';
export const tabs = [
  {
    id: GEOIP_ID,
    name: (
      <FormattedMessage
        id="xpack.ingestPipelines.manageProcessors.geoip.tableTitle"
        defaultMessage="GeoIP"
      />
    ),
    content: <GeoipList />,
  },
];
