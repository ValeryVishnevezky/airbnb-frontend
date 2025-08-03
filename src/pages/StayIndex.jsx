import { store } from "../store/store.js"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loadStays } from "../store/actions/stay.actions.js"
import { setFilterBy } from "../store/actions/stay.actions.js";
import { stayService } from "../services/stay/stay.service.local.js"
import { StayList } from "../cmps/StayList.jsx"
import { StayCategories } from "../cmps/StayFilterCategories.jsx"

export default function StayIndex() {
  const stays = useSelector((storeState) => storeState.stayModule.stays)
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)

  useEffect(() => {
    loadStays(filterBy)
  }, [filterBy])

  function onSetFilter(filterBy) {
    store.dispatch(setFilterBy(filterBy))
  }

  return (
    <section className="stay-index">
      <StayCategories filterBy={filterBy} onSetFilter={onSetFilter} />
      <StayList stays={stays} />
    </section>
  )
}
