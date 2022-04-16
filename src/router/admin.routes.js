import { Switch, Route, Redirect } from 'react-router-dom';

import Sidebar from '../components/SidebarAdm';
import Dashboard from '../pages/admin/Dashboard/index';
import Users from '../pages/admin/Users/index'
import Suppliers from '../pages/admin/Suppliers/index'
import Products from '../pages/admin/Products/index';
import Settings from '../pages/admin/Profile/index'

import Maps from '../pages/Login';
import Footer from '../components/Footer';

import '../assets/styles/tailwind.css';

function User() {
    return (
        <>
            <Sidebar />
            <div className="md:ml-64">
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/suppliers" component={Suppliers} />
                    <Route exact path="/products" component={Products} />
                    <Route exact path="/profile" component={Settings} />
                    <Route exact path="/maps" component={Maps} />
                    <Redirect from="*" to="/" />
                </Switch>
                <Footer />
            </div>
        </>
    );
}

export default User;
