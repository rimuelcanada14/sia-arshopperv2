import * as React from 'react';
import {Admin, Resource, ListGuesser, List} from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const dataProvider = simpleRestProvider('http://localhost:8000/api/dashboard/');

const AdminDashboard = () => {
    <Admin dataProvider={dataProvider}>
        <Resource name="users" list={ListGuesser} />
    </Admin>
}

export default AdminDashboard;