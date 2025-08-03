import tvicon from '/svg/tv.svg'
import wifiicon from '/svg/wifi.svg'
import kitchenicon from '/svg/kitchen.svg'
import smokingallowedicon from '/svg/smokingallowed.svg'
import petsallowedicon from '/svg/petsallowed.svg'
import cookingbasicsicon from '/svg/cookingbasics.svg'
import airconditioningicon from '/svg/air-conditioning-icon.svg'
import bbqgrillicon from '/svg/bbq-grill-icon.svg'
import beachareaicon from '/svg/beach-area-icon.svg'
import fireextinguishericon from '/svg/fire-extinguisher-icon.svg'
import fireplaceicon from '/svg/fireplace-icon.svg'
import firstaidkiticon from '/svg/first-aid-kit-icon.svg'
import gymicon from '/svg/gym-icon.svg'
import hottubicon from '/svg/hot-tub-icon.svg'
import lakeareaicon from '/svg/lake-area-icon.svg'
import outdoordiningicon from '/svg/outdoor-dining-icon.svg'
import paidparkingicon from '/svg/paid-parking-icon.svg'
import parkingicon from '/svg/parking-icon.svg'
import patioicon from '/svg/patio-icon.svg'
import pianoicon from '/svg/piano-icon.svg'
import poolicon from '/svg/pool-icon.svg'
import pooltableicon from '/svg/pool-table-icon.svg'
import showericon from '/svg/shower-icon.svg'
import skiicon from '/svg/ski-icon.svg'
import smokealarmicon from '/svg/smoke-alarm-icon.svg'
import washingmachineicon from '/svg/washing-machine-icon.svg'
import workspaceicon from '/svg/workspace-icon.svg'
import dryericon from '/svg/dryer.svg'
import elevatoricon from '/svg/elevator.svg'
import essentialsicon from '/svg/essentials.svg'
import freeicon from '/svg/free.svg'
import gardenicon from '/svg/garden.svg'
import hairicon from '/svg/hair.svg'
import heatingicon from '/svg/heating.svg'
import ironicon from '/svg/iron.svg'
import lockboxicon from '/svg/lockbox.svg'
import mountainicon from '/svg/mountain.svg'
import privatehottubicon from '/svg/private-hot-tub.svg'
import shampooicon from '/svg/shampoo.svg'

export const amenityIcons = {
    TV: tvicon,
    Wifi: wifiicon,
    Kitchen: kitchenicon,
    'Smoking allowed': smokingallowedicon,
    'Pets allowed': petsallowedicon,
    'Cooking basics': cookingbasicsicon,
    'Air conditioning': airconditioningicon,
    'BBQ grill': bbqgrillicon,
    'Beach area': beachareaicon,
    'Fire extinguisher': fireextinguishericon,
    Fireplace: fireplaceicon,
    'First aid kit': firstaidkiticon,
    Gym: gymicon,
    'Hot tub': hottubicon,
    'Lake area': lakeareaicon,
    'Outdoor dining': outdoordiningicon,
    'Paid parking': paidparkingicon,
    Parking: parkingicon,
    Patio: patioicon,
    Piano: pianoicon,
    Pool: poolicon,
    'Pool table': pooltableicon,
    Shower: showericon,
    Ski: skiicon,
    'Smoke alarm': smokealarmicon,
    'Washing machine': washingmachineicon,
    Workspace: workspaceicon,
    Dryer: dryericon,
    Elevator: elevatoricon,
    Essentials: essentialsicon,
    Free: freeicon,
    Garden: gardenicon,
    'Hair dryer': hairicon,
    Heating: heatingicon,
    Iron: ironicon,
    Lockbox: lockboxicon,
    Mountain: mountainicon,
    'Private hot tub': privatehottubicon,
    Shampoo: shampooicon,
}

export function filterAmenities(amenities, amenityIcons) {
    return amenities.filter(amenity => amenityIcons.hasOwnProperty(amenity)).slice(0, 10)
}




