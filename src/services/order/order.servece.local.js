import { storageService } from '../async-storage.service'
// import { userService } from '../user'
import { data } from '../../../data/stay.json.js'
const STORAGE_KEY = 'order'
// window.cs = orderService

createOrders()

export const orderServiceLocal = {
    saveOrder,
    query
}
async function query(filterBy = {}) {
    var orders = await storageService.query(STORAGE_KEY)
    return orders
}
function saveOrder(order) {
    if (order._id) {
        return storageService.put(STORAGE_KEY, order)
    } else {
        // order.guest = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, order)
    }
}
async function createOrders() {
    var orders = await storageService.query(STORAGE_KEY)
    if (!orders.length) {
        const orders = data.orders
        console.log(orders);
        storageService.save(STORAGE_KEY, orders)
    }
}