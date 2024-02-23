// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import DonutsIndex from './components/donuts/DonutsIndex'
import DonutShow from './components/donuts/DonutShow'
import CoffeesIndex from './components/coffees/CoffeesIndex'
import CoffeeShow from './components/coffees/CoffeeShow'
import OrdersPage from './components/orders/OrdersPage'
import DeleteItem from './components/orders/DeleteItem';


const App = () => {

  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])
  //const [order, setOrder] = useState([])
  const [order, setOrder] = useState({
    donuts: [],
    coffees: [],
  });
  const [hasOrder, setHasOrder] = useState(false)

  useEffect(() => {
	// access localStorage
	const loggedInUser = localStorage.getItem('user')

	if (loggedInUser) {
		// we need to parse the json string
		const foundUser = JSON.parse(loggedInUser)
		// then set that saved user in state
		setUser(foundUser)
		//clear order for new user
		setOrder({ donuts: [], coffees: [] })
	}
}, [])

  console.log('user in app', user)
  console.log('message alerts', msgAlerts)
  const clearUser = () => {
    console.log('clear user ran')
    setUser(null)
	setOrder({ donuts: [], coffees: [] })
  }

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}

	const updateOrderStatus = (hasPlacedOrder) => {
		setHasOrder(hasPlacedOrder);
	  };
	
	  const onDeleteItemClick = (type, index) => {
		const updatedOrder = { ...order };
	
		if (type === 'donut') {
		  updatedOrder.donuts.splice(index, 1);
		} else if (type === 'coffee') {
		  updatedOrder.coffees.splice(index, 1);
		}
	
		setOrder(updatedOrder);
	  };
		return (
			
			<Fragment>
				<Header user={user} hasOrder={hasOrder} updateOrderStatus={updateOrderStatus}/>
				<Routes>
					<Route path='/' element={<Home msgAlert={msgAlert} user={user} order={order} setOrder={setOrder}/>} />
					<Route
						path='/sign-up'
						element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
          <Route
            path='/sign-out'
            element={
              <RequireAuth user={user}>
                <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
              </RequireAuth>
            }
          />
          <Route
            path='/change-password'
            element={
              <RequireAuth user={user}>
                <ChangePassword msgAlert={msgAlert} user={user} />
              </RequireAuth>}
          />
		  	<Route path='/donuts'
			 component = {DonutsIndex}
			 element={
				<DonutsIndex order={order} setOrder={setOrder} msgAlert={msgAlert}/>
			 } 
			 />
			<Route 
					path='donuts/:id'
					component = {DonutShow}
					element={
						<DonutShow user={user} msgAlert={msgAlert}/>
					}
				/>  
			<Route path='/coffees'
			 component = {CoffeesIndex}
			 element={
				<CoffeesIndex order={order} setOrder={setOrder} msgAlert={msgAlert}/>
			 } 
			 />
			<Route path='/coffees/:id'
			 component = {CoffeeShow}
			 element={
				<CoffeeShow />
			 } 
			 />
			<Route path='/orders' component = {OrdersPage} element={<OrdersPage orders={order} user={user} msgAlert={msgAlert} />}  />
			
			<Route path='/orders/mine' component = {OrdersPage} element={<OrdersPage orders={order} user={user} msgAlert={msgAlert} onDeleteItemClick={onDeleteItemClick} DeleteItem={DeleteItem} />}  />
			</Routes>
			
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
					
				))}
			</Fragment>
		)
}

export default App
