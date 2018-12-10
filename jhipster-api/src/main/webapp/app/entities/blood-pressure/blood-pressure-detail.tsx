import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './blood-pressure.reducer';
import { IBloodPressure } from 'app/shared/model/blood-pressure.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBloodPressureDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BloodPressureDetail extends React.Component<IBloodPressureDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { bloodPressureEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="healthPointsApp.bloodPressure.detail.title">BloodPressure</Translate> [<b>{bloodPressureEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="timestamp">
                <Translate contentKey="healthPointsApp.bloodPressure.timestamp">Timestamp</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={bloodPressureEntity.timestamp} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="systolic">
                <Translate contentKey="healthPointsApp.bloodPressure.systolic">Systolic</Translate>
              </span>
            </dt>
            <dd>{bloodPressureEntity.systolic}</dd>
            <dt>
              <span id="diastolic">
                <Translate contentKey="healthPointsApp.bloodPressure.diastolic">Diastolic</Translate>
              </span>
            </dt>
            <dd>{bloodPressureEntity.diastolic}</dd>
            <dt>
              <Translate contentKey="healthPointsApp.bloodPressure.user">User</Translate>
            </dt>
            <dd>{bloodPressureEntity.user ? bloodPressureEntity.user.login : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/blood-pressure" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/blood-pressure/${bloodPressureEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ bloodPressure }: IRootState) => ({
  bloodPressureEntity: bloodPressure.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BloodPressureDetail);
