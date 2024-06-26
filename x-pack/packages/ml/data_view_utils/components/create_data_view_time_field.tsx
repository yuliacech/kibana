/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { type FC } from 'react';

import { EuiFormRow, EuiSelect } from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n-react';
import { i18n } from '@kbn/i18n';

interface CreateDataViewTimeFieldProps {
  dataViewAvailableTimeFields: string[];
  dataViewTimeField: string | undefined;
  onTimeFieldChanged: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const CreateDataViewTimeField: FC<CreateDataViewTimeFieldProps> = ({
  dataViewAvailableTimeFields,
  dataViewTimeField,
  onTimeFieldChanged,
}) => {
  const noTimeFieldLabel = i18n.translate('xpack.ml.dataViewUtils.noTimeFieldOptionLabel', {
    defaultMessage: "I don't want to use the time field option",
  });

  const noTimeFieldOption = {
    text: noTimeFieldLabel,
    value: undefined,
  };

  const disabledDividerOption = {
    disabled: true,
    text: '───',
    value: '',
  };

  return (
    <EuiFormRow
      label={
        <FormattedMessage
          id="xpack.ml.dataViewUtils.dataViewTimeFieldLabel"
          defaultMessage="Time field for data view"
        />
      }
      helpText={
        <FormattedMessage
          id="xpack.ml.dataViewUtils.dataViewTimeFieldHelpText"
          defaultMessage="Select a primary time field for use with the global time filter."
        />
      }
    >
      <EuiSelect
        options={[
          ...dataViewAvailableTimeFields.map((text) => ({ text })),
          disabledDividerOption,
          noTimeFieldOption,
        ]}
        value={dataViewTimeField}
        onChange={onTimeFieldChanged}
        data-test-subj="mlDataViewTimeFieldSelect"
      />
    </EuiFormRow>
  );
};
