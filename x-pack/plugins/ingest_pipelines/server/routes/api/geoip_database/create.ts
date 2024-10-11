/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { schema } from '@kbn/config-schema';
import { RouteDependencies } from '../../../types';
import { API_BASE_PATH } from '../../../../common/constants';
import { serializeGeoipDatabase } from './serialization';
import { normalizeDatabaseName } from './normalize_database_name';

const bodySchema = schema.object({
  databaseType: schema.oneOf([schema.literal('ipinfo'), schema.literal('maxmind')]),
  // maxmind is only needed for "geoip" type
  maxmind: schema.maybe(schema.string({ maxLength: 1000 })),
  // only allow database names in sync with ES
  databaseName: schema.oneOf([
    // geoip names https://github.com/elastic/elasticsearch/blob/f150e2c11df0fe3bef298c55bd867437e50f5f73/modules/ingest-geoip/src/main/java/org/elasticsearch/ingest/geoip/direct/DatabaseConfiguration.java#L58
    schema.literal('GeoIP2-Anonymous-IP'),
    schema.literal('GeoIP2-City'),
    schema.literal('GeoIP2-Connection-Type'),
    schema.literal('GeoIP2-Country'),
    schema.literal('GeoIP2-Domain'),
    schema.literal('GeoIP2-Enterprise'),
    schema.literal('GeoIP2-ISP'),
    // ipinfo names
    schema.literal('asn'),
    schema.literal('country'),
    schema.literal('standard_asn'),
    schema.literal('standard_location'),
    schema.literal('standard_privacy'),
  ]),
});

export const registerCreateGeoipRoute = ({
  router,
  lib: { handleEsError },
}: RouteDependencies): void => {
  router.post(
    {
      path: `${API_BASE_PATH}/geoip_database`,
      validate: {
        body: bodySchema,
      },
    },
    async (ctx, req, res) => {
      const { client: clusterClient } = (await ctx.core).elasticsearch;
      const { databaseType, databaseName, maxmind } = req.body;
      const serializedDatabase = serializeGeoipDatabase({ databaseType, databaseName, maxmind });
      const normalizedDatabaseName = normalizeDatabaseName(databaseName);

      try {
        // the js client doesn't work for this API yet https://github.com/elastic/elasticsearch-specification/issues/2810
        await clusterClient.asCurrentUser.transport.request({
          method: 'PUT',
          path: `/_ingest/geoip/database/${normalizedDatabaseName}`,
          body: serializedDatabase,
        });

        return res.ok({ body: { name: databaseName, id: normalizedDatabaseName } });
      } catch (error) {
        return handleEsError({ error, response: res });
      }
    }
  );
};
