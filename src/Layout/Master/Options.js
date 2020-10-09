import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

class Options extends React.Component {
    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Options</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>Option Title</th>
                                            <th>Question Title</th>
                                            <th>SubLevel Name</th>
                                            <th>Level Name</th>
                                            <th>Descriptions</th>
                                            <th>Update/Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">
                                                1
                                                <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                                            </th>
                                            <td>Mark</td>
                                            <td>
                                                <h6 className="mb-1">Isabella Christensen</h6>
                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                            </td>
                                            <td>
                                                <h6 className="text-muted"><i className="fa fa-circle text-c-red f-10 m-r-15" />11 MAY 12:56</h6>
                                            </td>
                                            <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Delete</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Update</a></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                2
                                                <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
                                            </th>
                                            <td>Mark</td>
                                            <td>
                                                <h6 className="mb-1">Isabella Christensen</h6>
                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                            </td>
                                            <td>
                                                <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />11 MAY 12:56</h6>
                                            </td>
                                            <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Delete</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Update</a></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                3
                                                <img className="rounded-circle" style={{ width: '40px' }} src={avatar3} alt="activity-user" />
                                            </th>
                                            <td>Mark</td>
                                            <td>
                                                <h6 className="mb-1">Isabella Christensen</h6>
                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                            </td>
                                            <td>
                                                <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />11 MAY 12:56</h6>
                                            </td>
                                            <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Delete</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Update</a></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Options;