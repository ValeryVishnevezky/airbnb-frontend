import { orderService } from '../../services/order/order.service'
import { store } from '../store'
import { ADD_ORDER, REMOVE_ORDER, SET_ORDERS, SET_USER_ORDERS, SET_HOST_ORDERS, UPDATE_ORDER } from '../reducers/order.reducer'

export async function loadOrders(filterBy = {}) {
	try {
		const orders = await orderService.query(filterBy)
		store.dispatch({ type: SET_ORDERS, orders })
	} catch (err) {
		console.error('OrderActions: Error in loadOrders', err)
		throw err
	}
}

export async function addOrder(order) {
	try {
		const addedOrder = await orderService.save(order)
		store.dispatch({ type: ADD_ORDER, order: addedOrder })
	} catch (err) {
		console.error('OrderActions: Error in addOrder', err)
		throw err
	}
}

export async function updateOrder(order) {
	try {
	  const updatedOrder = await orderService.save(order)
	  store.dispatch({ type: UPDATE_ORDER, order: updatedOrder })
	} catch (err) {
	  console.error('OrderActions: Error in updateOrder', err)
	  throw err
	}
  }

export async function removeOrder(orderId) {
	try {
		await orderService.remove(orderId)
		store.dispatch({ type: REMOVE_ORDER, orderId })
	} catch (err) {
		console.error('OrderActions: Error in removeOrder', err)
		throw err
	}
}

export async function loadUserOrders(userId) {
	try {
	  const userOrders = await orderService.getUserOrders(userId)
	  store.dispatch({ type: SET_USER_ORDERS, orders: userOrders })
	  return userOrders
	} catch (err) {
	  console.error('OrderActions: Error in loadUserOrders', err)
	  throw err
	}
  }
  
  export async function loadHostOrders(hostId) {
	try {
	  const hostOrders = await orderService.getHostOrders(hostId)
	  store.dispatch({ type: SET_HOST_ORDERS, orders: hostOrders })
	  return hostOrders
	} catch (err) {
	  console.error('OrderActions: Error in loadHostOrders', err)
	  throw err
	}
  }