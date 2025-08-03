const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../utils/util.service.js'

import { stayService as local } from './stay.service.js'
import { stayServiceRemote as remote } from './stay.service.remote.js'


const service = VITE_LOCAL === 'true' ? local : remote
export const stayService = { ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.stayService = stayService
