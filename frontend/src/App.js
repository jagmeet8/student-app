import axios from 'axios'
import React from 'react';
import './App.css';
import CourseList from './CourseList';
import Courses from "./Courses";

import {BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect} from 'react-router-dom';
import {Breadcrumb, Button, Card, Col, Form, Icon, Input, Layout, Menu, Row} from 'antd';

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
        };
    }

    onSelect(data) {
        this.state.listData.push(data);
        this.setState({
            listData: this.state.listData,
        });
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

    goto = (name) => {
        this.history.push(name);
    }

    render() {
        return (
            <Router>
                <Layout style={{minHeight: '100vh'}}>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo"/>
                        <Menu theme="dark" mode="inline">
                            <Menu.Item key="1">
                                <Icon type="pie-chart"/>
                                <Link to={'/courses'}> <span>Courses</span></Link>

                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="desktop"/>
                                <Link to={'/account'}><span>Account</span></Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0}}/>
                        <Content style={{margin: '0 16px'}}>
                            <Switch>
                                <Route exact path={"/courses"} component={CourseList}/>
                                <Route exact path={"/account"} component={Courses}/>
                            </Switch>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            <div>
                                {this.state.listData.length > 0 && <Link to={`/courses`}><Button
                                    onClick={this.saveData.bind(this)}>{'Proceed (' + this.state.listData.length + ')'}
                                </Button></Link>}
                            </div>
                        </Footer>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

const App = Form.create({name: 'app'})(MyForm);

export default App;
