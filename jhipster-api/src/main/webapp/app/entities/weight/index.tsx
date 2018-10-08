import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Weight from './weight';
import WeightDetail from './weight-detail';
import WeightUpdate from './weight-update';
import WeightDeleteDialog from './weight-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={WeightUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={WeightUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={WeightDetail} />
      <ErrorBoundaryRoute path={match.url} component={Weight} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={WeightDeleteDialog} />
  </>
);

export default Routes;
