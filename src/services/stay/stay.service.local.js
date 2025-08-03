
import { storageService } from '../async-storage.service'
import { makeId } from '../utils/util.service.js'
import { userService } from '../user'
// import { data } from "../../../data/stay.json.js"
// import newStays from "../../../data/stay.json";

const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    addStayMsg,
    getDefaultFilter,
    getEmptyStay
}
window.cs = stayService
// _createStays()

async function query(filterBy = {}) {
    var stays = await storageService.query(STORAGE_KEY)
    const { minCapacity, place, availableDates, label } = filterBy
    if (place) {
        stays = stays.filter(stay =>
            stay.loc.city.toLowerCase().includes(place.toLowerCase()) ||
            stay.loc.country.toLowerCase().includes(place.toLowerCase())
        )
    }
    if (availableDates?.start && availableDates?.end) {
        const startDate = new Date(availableDates.start)
        const endDate = new Date(availableDates.end)
        stays = stays.filter(stay =>
            stay.availableDates.some(dateRange => {
                const rangeStart = new Date(`${dateRange.month} ${dateRange.start}`)
                const rangeEnd = new Date(`${dateRange.month} ${dateRange.end}`)
                return rangeStart <= startDate && rangeEnd >= endDate
            })
        )
    }
    if (minCapacity) {
        stays = stays.filter(stay => stay.capacity >= minCapacity)
    }
    if (label){
        stays = stays.filter(stay => stay.labels.some((stayLabel) => stayLabel === label))
    }
    return stays
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
    await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        const stayToSave = {
            _id: stay._id,
            name: stay.name,
            summary: stay.summary,
            imgUrls: stay.imgUrls,
            loc: stay.loc,
            price: stay.price,
            capacity: stay.capacity,
        }
        savedStay = await storageService.put(STORAGE_KEY, stayToSave)
    } else {
        const stayToSave = {
            name: stay.name,
            summary: stay.summary,
            imgUrls: stay.imgUrls,
            loc: stay.loc,
            price: stay.price,
            capacity: stay.capacity,
            amenities: [],
            availableDates: [
                {
                    month: 'Nov',
                    start: '20',
                    end: '30'
                }
            ],
            reviews: [],
            host: userService.getLoggedinUser(),
            msgs: []
        }
        savedStay = await storageService.post(STORAGE_KEY, stayToSave)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    const stay = await getById(stayId)
    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    stay.msgs.push(msg)
    await storageService.put(STORAGE_KEY, stay)
    return msg
}

function getDefaultFilter() {
    return {
        minCapacity: '',
        place: '',
        availableDates: {
            start: null,
            end: null
        },
        label: false,
    }
}

function getEmptyStay() {
    return (
        {
            name: '',
            imgUrls: [null, null, null, null, null],
            price: '',
            summary: '',
            amenities: [],
            capacity: '',
            loc: {
                country: '',
                city: '',
                address: '',
            }
        }
    )
}

// async function _createStays() {
//     var stays = await storageService.query(STORAGE_KEY)
//     if (!stays.length) {
//         const staysToSave = newStays
//         if (Array.isArray(staysToSave) && staysToSave.length > 0) {
//             await storageService.save(STORAGE_KEY, staysToSave)
//         } else {
//             console.error('newStays is not a valid array or is empty', staysToSave)
//         }
//     }
// }