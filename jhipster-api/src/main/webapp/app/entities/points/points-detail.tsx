import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './points.reducer';
import { IPoints } from 'app/shared/model/points.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPointsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PointsDetail extends React.Component<IPointsDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pointsEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="healthPointsApp.points.detail.title">Points</Translate> [<b>{pointsEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="date">
                <Translate contentKey="healthPointsApp.points.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={pointsEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="exercise">
                <Translate contentKey="healthPointsApp.points.exercise">Exercise</Translate>
              </span>
            </dt>
            <dd>{pointsEntity.exercise}</dd>
            <dt>
              <span id="meals">
                <Translate contentKey="healthPointsApp.points.meals">Meals</Translate>
              </span>
            </dt>
            <dd>{pointsEntity.meals}</dd>
            <dt>
              <span id="alcohol">
                <Translate contentKey="healthPointsApp.points.alcohol">Alcohol</Translate>
              </span>
            </dt>
            <dd>{pointsEntity.alcohol}</dd>
            <dt>
              <span id="notes">
                <Translate contentKey="healthPointsApp.points.notes">Notes</Translate>
              </span>
            </dt>
            <dd>{pointsEntity.notes}</dd>
            <dt>
              <Translate contentKey="healthPointsApp.points.user">User</Translate>
            </dt>
            <dd>{pointsEntity.user ? pointsEntity.user.login : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/points" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/points/${pointsEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ points }: IRootState) => ({
  pointsEntity: points.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PointsDetail);
