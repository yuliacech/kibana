/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { KibanaRenderContextProvider } from '@kbn/react-kibana-context-render';
import { Route } from '@kbn/shared-ux-router';

import { EuiPage, EuiText } from '@elastic/eui';
import { AppMountParameters, CoreStart } from '@kbn/core/public';

export interface AlertingExampleComponentParams {
  basename: string;
}

const AlertingExampleApp = (deps: AlertingExampleComponentParams) => {
  const { basename } = deps;
  return (
    <Router basename={basename}>
      <EuiPage>
        <Route
          path={`/rule/:id`}
          render={(props) => {
            return (
              <EuiText data-test-subj="noop-title">
                <h2>View Rule {props.match.params.id}</h2>
              </EuiText>
            );
          }}
        />
      </EuiPage>
    </Router>
  );
};

export const renderApp = (
  core: CoreStart,
  deps: any,
  { appBasePath, element }: AppMountParameters
) => {
  ReactDOM.render(
    <KibanaRenderContextProvider {...core}>
      <AlertingExampleApp basename={appBasePath} {...deps} />
    </KibanaRenderContextProvider>,
    element
  );

  return () => ReactDOM.unmountComponentAtNode(element);
};
