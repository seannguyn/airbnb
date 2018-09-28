import React, {Component} from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'DELETE_HOUSE':
            console.log("deleting house", action.payload);
            return {
                HouseList: state.HouseList.filter((eachHouse) => eachHouse.id !== action.payload),
            };

        case 'ADD_HOUSE':
            console.log("adding house");
            return {...state, HouseList: action.payload};

        case 'EDIT_HOUSE':
            console.log("editing house");
            return {
                ...state,
                HouseList: state.HouseList.map((eachHouse) => eachHouse.id === action.payload.id ? action.payload : eachHouse)
            };

        case 'LOGIN':
            console.log('user login');
            return {
                ...state,
                currentUser: [action.payload],
                logged_in: true,
                dialog: {
                    open: false,
                    login: true,
                },
            };

        case 'HOSTING':
            console.log("host context", action.payload);
            return {
                myHostingList: [action.payload, ...state.myHostingList],
                AllHostingList: [action.payload, ...state.AllHostingList],
            };

        case 'EDITHOST':
            return {
                myHostingList: state.myHostingList.map((host) => host.id === action.payload.id ? (host = action.payload) : host)
            };

        case 'DELETE_HOST':
            console.log("deleting hosting", action.payload);
            return {
                myHostingList: state.myHostingList.filter((host) => host.id !== action.payload),
                AllHostingList: state.AllHostingList.filter((host) => host.id !== action.payload),
            };

        case 'TOGGLE_SIDEBAR':
            const {sidebar_show} = state;
            return {
                ...state,
                sidebar_show: !sidebar_show
            };

        case 'LOGOUT':
            console.log("here LOGOUT");
            localStorage.clear();
            return {
                ...state,
                logged_in: false,
                sidebar_show: false,
                currentUser: [],
            };

        case 'OPEN_DIALOG':
            return {
                ...state,
                dialog: action.payload
            };

        case 'CLOSE_DIALOG':
            return {
                ...state,
                dialog: {
                    open: false,
                    login: true,
                },
            };

        case 'TOGGLE_SIGNIN':
            return {
                ...state,
                dialog: {
                    open: true,
                    login: !state.dialog.login,
                },
            };

        default:
            return state;
    }
};

export class Provider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HouseList: [],
            myHouseList: [],
            currentUser: [],
            myHostingList: [],
            AllHostingList: [],
            sidebar_show: false,
            logged_in: false,
            dialog: {
                open: false,
                login: true,
            },
            dispatch: (action) => {
                this.setState((state) => reducer(state, action))
            }
        };
    }

    componentDidMount() {
        const res = axios.get('/accommodation/');
        this.setState({HouseList: res.data});

        const allHosting = axios.get('https://localhost:8000/accommodationHosting/');
        this.setState({AllHostingList: allHosting.data});

        if (this.state.currentUser.length === 1) {
            const {token, user_id} = this.state.currentUser[0];

            const res = axios.get(`/accommodationHosting/?user=${user_id}`,
                {
                    headers: { 'Authorization': {token}}
                });

            this.setState({ myHostingList: res.data });
        }

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser === null) {
            currentUser = []
        }
        if (currentUser.length > 0) {
            this.setState({
                currentUser: JSON.parse(localStorage.getItem('currentUser')),
                logged_in: true,
            });
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        localStorage.setItem('currentUser', JSON.stringify(nextState.currentUser));
    }

    componentDidUpdate() {
        if (this.state.currentUser.length === 1) {
            const {token, user_id} = this.state.currentUser[0];

            const res = axios.get('/accommodationHosting/',
                {
                    headers: {
                        'Authorization': {token}
                    }
                }
            );

            if (this.state.myHostingList.length === 0) {
                const myHouse = axios.get(`/accommodation/?user=${user_id}`)
                this.setState({ myHouseList: myHouse.data });
                this.setState({ myHostingList: res.data });
            }
        }
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}
export const Consumer = Context.Consumer;