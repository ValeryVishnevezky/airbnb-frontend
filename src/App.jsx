import React, { Suspense } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router"

const StayIndex = React.lazy(() => import("./pages/StayIndex.jsx"))
const StayDetails = React.lazy(() => import("./pages/StayDetails.jsx"))
const UserDetails = React.lazy(() => import("./pages/UserDetails.jsx"))
const StayEdit = React.lazy(() => import("./pages/StayEdit.jsx"))
const Trips = React.lazy(() => import("./pages/Trips.jsx"))
const DashboardReservation = React.lazy(() => import("./pages/DashboardReservation.jsx"))
const DashboardListings = React.lazy(() => import("./pages/DashboardListings.jsx"))
const LoginSignup = React.lazy(() => import("./cmps/LoginSignup.jsx"))
const ReservationDetails = React.lazy(() => import("./cmps/ReservationDetails.jsx"))

import { AppHeader } from "./cmps/AppHeader.jsx"
import { AppFooter } from "./cmps/AppFooter.jsx"
import { Login } from "./cmps/Login.jsx"
import { Signup } from "./cmps/Signup.jsx"

export function App() {

  return (
    <div className="main-container">
      <AppHeader />

      <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path="/" element={<Navigate to="/stay" replace />} />
          <Route path="stay" element={<StayIndex />} />
          <Route path="stay/:stayId" element={<StayDetails />} />
          <Route path="/stay/edit/:stayId?" element={<StayEdit />} />
          <Route path="/reservation/:stayId" element={<ReservationDetails />} />
          <Route path="user/:id" element={<UserDetails />} />
          <Route path="trips" element={<Trips />} />
          <Route path="/dashboard/reservations" element={<DashboardReservation />} />
          <Route path="/dashboard/listings" element={<DashboardListings />} />
          <Route path="login" element={<LoginSignup />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
		  <Route path="*" element={<div>Page not found</div>} />
        </Routes>
        </Suspense>
      </main>

      <AppFooter />
    </div>
  )
}
