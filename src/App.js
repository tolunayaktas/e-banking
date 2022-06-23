import { Home } from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { AuthProvider } from "./context/auth";
import { Login } from "./pages/Login/Login";
import { CreateUser } from "./pages/Admin/CreateUser";
import { PrivateRoute } from "./components/route/PrivateRoute";
import { RestrictedRoute } from "./components/route/RestrictedRoute";
import { AdminRoute } from "./components/route/AdminRoute";
import { AdminLayout } from "./components/admin/layout";
import { UserList } from "./pages/Admin/UserList";
import { Dashboard } from "./pages/User/Dashboard";
import { useEffect } from "react";
import { AddBankAccount } from "./pages/User/AddBankAccount";
import { Accounts } from "./pages/User/Accounts";
import { Summary } from "./pages/User/Summary";
import { SendMoney } from "./pages/User/SendMoney";

function App() {


  useEffect(() => {
    let arr = []
    Array.from(Array(24).keys()).map(() => {
      arr.push(Math.floor((Math.random() * 10)))
    })
  }, [])
  return (

    <Router>
      <Switch>
        <AuthProvider>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path={["/send","/summary","/accounts", "/add-bank-account"]}>
            <Dashboard>
              <Route path="/summary" component={Summary}/>
              <Route path="/send" component={SendMoney}/>
              <Route path="/accounts" component={Accounts} />
              <Route path="/add-bank-account" component={AddBankAccount} />
            </Dashboard>
          </PrivateRoute>
          <RestrictedRoute exact path={["/login"]}>
            <Route path="/login" component={Login} />
          </RestrictedRoute>

          <AdminRoute exact path={["/admin", "/admin/create-user"]}>
            <AdminLayout>
              <Route exact path="/admin" component={UserList} />
              <Route path="/admin/create-user" component={CreateUser} />
              

            </AdminLayout>
          </AdminRoute>

        </AuthProvider>
      </Switch>
    </Router>

  );
}

export default App;
