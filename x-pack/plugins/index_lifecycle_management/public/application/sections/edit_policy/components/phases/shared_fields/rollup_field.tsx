/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { FormattedMessage } from '@kbn/i18n/react';
import { i18n } from '@kbn/i18n';
import { EuiCallOut, EuiSpacer, EuiTextColor } from '@elastic/eui';
import React, { FunctionComponent, useState } from 'react';

import { TextField } from '../../../../../../shared_imports';

import { useEditPolicyContext } from '../../../edit_policy_context';
import { UseField } from '../../../form';
import { i18nTexts } from '../../../i18n_texts';

import { LearnMoreLink, DescribedFormRow } from '../../';
import { Phases } from '../../../../../../../common/types';

interface Props {
  phase: keyof Omit<Phases, 'delete'>;
}

export const RollupField: FunctionComponent<Props> = ({ phase }) => {
  const { policy } = useEditPolicyContext();
  const initialValue = policy.phases[phase]?.actions?.rollup;
  const [isRollupEnabled, setRollupEnabled] = useState<boolean>(Boolean(initialValue));
  const renderInfoCallout = () => {
    if (isRollupEnabled) {
      return (
        <>
          <EuiSpacer />
          <EuiCallOut
            size="s"
            title={i18n.translate('xpack.indexLifecycleMgmt.editPolicy.rollupDeletionWarning', {
              defaultMessage:
                'Rollup deletes original data and replaces it with data of reduced granularity.',
            })}
          />
          <EuiSpacer />
        </>
      );
    }
  };
  return (
    <DescribedFormRow
      fieldNotices={renderInfoCallout()}
      title={
        <h3>
          <FormattedMessage
            id="xpack.indexLifecycleMgmt.editPolicy.rollupText"
            defaultMessage="Rollup"
          />
        </h3>
      }
      description={
        <EuiTextColor color="subdued">
          <FormattedMessage
            id="xpack.indexLifecycleMgmt.editPolicy.rollupExplanationText"
            defaultMessage="Rollup the index into less granular data for reduced storage."
          />{' '}
          <LearnMoreLink docPath="ilm-rollup.html" />
        </EuiTextColor>
      }
      titleSize="xs"
      switchProps={{
        'data-test-subj': `${phase}-rollupSwitch`,
        label: i18nTexts.editPolicy.rollupEnabledFieldLabel,
        checked: isRollupEnabled,
        onChange: (nextValue: boolean) => setRollupEnabled(nextValue),
      }}
      fullWidth
    >
      <UseField
        path={`phases.${phase}.actions.rollup.time_bucket_size`}
        component={TextField}
        helpText="Example sizes: 1000ms, 30s, 20m, 24h, 2d, 1w, 1M, 1y"
        componentProps={{
          fullWidth: false,
          euiFieldProps: {
            'data-test-subj': `${phase}-timeBucketSize`,
          },
        }}
      />
    </DescribedFormRow>
  );
};
