import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/shared/reducers/user-management';
import { getEntity, updateEntity, createEntity, reset } from './points.reducer';
import { IPoints } from 'app/shared/model/points.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPointsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPointsUpdateState {
  isNew: boolean;
  userId: string;
}

export class PointsUpdate extends React.Component<IPointsUpdateProps, IPointsUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { pointsEntity } = this.props;
      const entity = {
        ...pointsEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/points');
  };

  render() {
    const { pointsEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="healthPointsApp.points.home.createOrEditLabel">
              <Translate contentKey="healthPointsApp.points.home.createOrEditLabel">Create or edit a Points</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : pointsEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="points-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dateLabel" for="date">
                    <Translate contentKey="healthPointsApp.points.date">Date</Translate>
                  </Label>
                  <AvField
                    id="points-date"
                    type="date"
                    className="form-control"
                    name="date"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="exerciseLabel" for="exercise">
                    <Translate contentKey="healthPointsApp.points.exercise">Exercise</Translate>
                  </Label>
                  <AvField id="points-exercise" type="string" className="form-control" name="exercise" />
                </AvGroup>
                <AvGroup>
                  <Label id="mealsLabel" for="meals">
                    <Translate contentKey="healthPointsApp.points.meals">Meals</Translate>
                  </Label>
                  <AvField id="points-meals" type="string" className="form-control" name="meals" />
                </AvGroup>
                <AvGroup>
                  <Label id="alcoholLabel" for="alcohol">
                    <Translate contentKey="healthPointsApp.points.alcohol">Alcohol</Translate>
                  </Label>
                  <AvField id="points-alcohol" type="string" className="form-control" name="alcohol" />
                </AvGroup>
                <AvGroup>
                  <Label id="notesLabel" for="notes">
                    <Translate contentKey="healthPointsApp.points.notes">Notes</Translate>
                  </Label>
                  <AvField
                    id="points-notes"
                    type="text"
                    name="notes"
                    validate={{
                      maxLength: { value: 140, errorMessage: translate('entity.validation.maxlength', { max: 140 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="user.login">
                    <Translate contentKey="healthPointsApp.points.user">User</Translate>
                  </Label>
                  <AvInput id="points-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/points" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  pointsEntity: storeState.points.entity,
  loading: storeState.points.loading,
  updating: storeState.points.updating,
  updateSuccess: storeState.points.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PointsUpdate);
