import React from 'react';
import './App.css';
import {Card, Col, Empty, Layout, Row, Typography} from 'antd';
import {Bar} from "react-chartjs-2";

const {Title} = Typography;

const {Header, Content, Footer} = Layout;

const data = {
    labels: ['2019', '2018', '2017', '2016', '2015', '2014', '2013'],
    datasets: [
        {
            label: 'Student Performance',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

class Courses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
        }
    }

    componentDidMount() {
    }

    render() {
        const courses = JSON.parse(localStorage.getItem('courses') || "[]");
        return (
            <Row gutter={16}>
                <Col span={12}>
                    <Title level={2} style={{marginTop: '20px'}}>Selected Courses</Title>
                    {courses && courses.length > 0 ? courses.map((item) => {
                        return <Card key={item._id} style={{marginBottom: '20px'}}
                                     title={'Course Name: '.concat(item.course)}>
                            <Row gutter={8} justify={'space-between'} align={'middle'}>
                                <Col span={12}><p><strong>CODE:</strong> {item.code}</p></Col>
                            </Row>
                        </Card>
                    }) : <Empty /> }
                </Col>
                <Col span={12}>
                    <Title level={2} style={{marginTop: '20px'}}>Performance</Title>
                    <Card>
                        <Bar
                            data={data}
                            width={100}
                            height={350}
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Courses;
