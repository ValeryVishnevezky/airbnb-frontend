// import { store } from '../store/store.js'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadStays } from '../store/actions/stay.actions.js'
import { setFilterBy } from '../store/actions/stay.actions.js'
import { stayService } from '../services/stay/stay.service.local.js'
import { StayList } from '../cmps/StayList.jsx'
import { StayCategories } from '../cmps/StayFilterCategories.jsx'

export default function StayIndex() {
  const dispatch = useDispatch()
  const stays = useSelector(state => state.stayModule.stays)
  const filterBy = useSelector(state => state.stayModule.filterBy)
  const loaderRef = useRef(null)
  const isLoadingRef = useRef(false)

  console.log(stays.length);
  

  useEffect(() => {
    // dispatch(setFilterBy({ ...filterBy, page: 0 }))
    loadStays({ ...filterBy, page: 0 })
  }, [filterBy.place, filterBy.minCapacity, filterBy.availableDates, filterBy.label])

  useEffect(() => {
    if (!loaderRef.current) return

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (entry.isIntersecting && !isLoadingRef.current) {
          isLoadingRef.current = true
          const nextPage = filterBy.page + 1
          loadStays({ ...filterBy, page: nextPage }).finally(() => {
            isLoadingRef.current = false
          })
          dispatch(setFilterBy({ ...filterBy, page: nextPage }))
        }
      }
    )

    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [filterBy])

  function onSetFilter(newFilter) {
    dispatch(setFilterBy({ ...filterBy, ...newFilter, page: 0 }))
  }

  return (
    <section className='stay-index'>
      <StayCategories filterBy={filterBy} onSetFilter={onSetFilter} />
      <StayList stays={stays} />
      <div ref={loaderRef} style={{ height: '50px' }} />
    </section>
  )
}
