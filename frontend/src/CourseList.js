import axios from 'axios'
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link} from 'react-router-dom'
import {Breadcrumb, Button, Card, Col, Form, Icon, Input, Layout, Menu, Row, notification, Empty} from 'antd';
import Courses from "./Courses";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;


let dataSource = [];

class MyForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            listData: [],
            collapsed: false,
        }
    }

    onSelect(data) {
        let courses = JSON.parse(window.localStorage.getItem('courses'));
        if (courses && courses.length) {
            courses.push(data);
        } else {
            courses = [data];
        }

        window.localStorage.setItem('courses', JSON.stringify(courses));
        notification.open({
            message: 'Course has been added to your account',
            description: `${data.course} has been added!`,
            icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        });
    }

    componentDidMount(){
        axios.post('http://localhost:3001/api/getData', {
                    searchText: "",
                }).then(r => {
                    dataSource = r.data && r.data.data || [];
                    console.log(dataSource)
                    this.setState({
                        dataSource: dataSource,
                    }, () => {
                        dataSource = [];
                    })
                }).catch(err => console.log(err))
    }

    onSearch(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                axios.post('http://localhost:3001/api/getData', {
                    searchText: values.course,
                }).then(r => {
                        r && r.data && r.data.data && r.data.data.map(item => {
                            console.log(item);
                            dataSource.push({
                                course: item.course,
                                code: item.code,
                                _id: item._id
                            })
                        });
                        this.setState({
                            dataSource: dataSource,
                        }, () => {
                            dataSource = [];
                        })
                    }
                )
                    .catch(err => console.log(err))
            }
        });
    }

    entry(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post(`http://localhost:3001/api/putData`, {
                    course: values.course,
                    code: values.code
                }).then(r => console.log(r))
                    .catch(err => console.log(err));
            }
        });

    }

    saveData() {
        localStorage.setItem('courses', JSON.stringify(this.state.listData));
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Courses</Breadcrumb.Item>
                    <Breadcrumb.Item>Search</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                    <Form layout={"vertical"} onKeyUp={this.onSearch.bind(this)}>
                        <Form.Item>
                            {getFieldDecorator('course')(<Input placeholder={'Enter search query'}/>)}
                        </Form.Item>
                    </Form>
                    <div>{this.state.dataSource.length > 0 ? this.state.dataSource.map((item) => {
                        return <Card key={item._id} style={{marginBottom: '20px'}}
                                     title={'Course Name: '.concat(item.course)}>
                            <Row gutter={8} justify={'space-between'} align={'middle'}>
                                <Col span={12}><p><strong>CODE:</strong> {item.code}</p></Col>
                                <Col span={12}><Button type="primary" htmlType={"button"}
                                                       onClick={this.onSelect.bind(this, item)}>+
                                    Add</Button></Col>
                            </Row>
                        </Card>
                    }) : <Empty />}
                    </div>
                </div>
            </div>
        );
    }
}

const App = Form.create({name: 'app'})(MyForm);

export default App;
