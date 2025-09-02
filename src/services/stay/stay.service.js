import { httpService } from '../../services/http.service.js'

const BASE_URL = 'stay/'

export const stayService = {
	query,
	getById,
	save,
	remove,
	getEmptyStay,
	getDefaultFilter,
	getFilterFromSearchParams
}

function query(filterBy = {}) {
	return httpService.get(BASE_URL, filterBy)
}

function getById(stayId) {
	return httpService.get(BASE_URL + stayId)
}

function remove(stayId) {
	return httpService.delete(BASE_URL + stayId)
}

function save(stay) {
	const method = stay._id ? 'put' : 'post'
	return httpService[method](BASE_URL, stay)
}

function getDefaultFilter() {
	return {
		minCapacity: '',
		adults: 0,
		children: 0,
		infants: 0,
		pets: 0,
		place: '',
		availableDates: {
			start: '',
			end: ''
		},
		label: [],
		page: 0,
		limit: 10
	}
}

function getEmptyStay() {
	return {
		name: '',
		imgUrls: [null, null, null, null, null],
		price: '',
		summary: '',
		amenities: [],
		capacity: '',
		loc: {
			country: '',
			city: '',
			address: ''
		}
	}
}

function getFilterFromSearchParams(searchParams) {
	const defaultFilter = getDefaultFilter()
	const filterBy = { ...defaultFilter }

	for (const field in defaultFilter) {
		if (field === 'availableDates') {
			filterBy[field].start = searchParams.get('checkIn') || ''
			filterBy[field].end = searchParams.get('checkOut') || ''
		} else {
			filterBy[field] = searchParams.get(field) || defaultFilter[field]
		}
	}
	return filterBy
}
