
// async function onRemoveStay(stayId) {
//     try {
//       await removeStay(stayId)
//       showSuccessMsg("Stay removed")
//     } catch (err) {
//       showErrorMsg("Cannot remove stay")
//     }
//   }

//   async function onAddStay() {
//     const stay = stayService.getEmptyStay()
//     stay.vendor = prompt("Vendor?")
//     try {
//       const savedStay = await addStay(stay)
//       showSuccessMsg(`Stay added (id: ${savedStay._id})`)
//     } catch (err) {
//       showErrorMsg("Cannot add stay")
//     }
//   }

//   async function onUpdateStay(stay) {
//     const speed = +prompt("New speed?", stay.speed)
//     if (speed === 0 || speed === stay.speed) return

//     const stayToSave = { ...stay, speed }
//     try {
//       const savedStay = await updateStay(stayToSave)
//       showSuccessMsg(`Stay updated, new speed: ${savedStay.speed}`)
//     } catch (err) {
//       showErrorMsg("Cannot update stay")
//     }
//   }