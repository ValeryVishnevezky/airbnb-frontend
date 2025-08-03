import { useLocation } from "react-router-dom";
import { useState } from "react";
import { AppHeaderMobileTop } from "./AppHeaderMobileTop.jsx";
import { AppHeaderMobileBottom } from "./AppHeaderMobileBottom.jsx";
import { StayFilterMobile } from "./StayFilterMobile.jsx";

export function AppHeaderMobile() {
  const location = useLocation();
  const isHomePage = location.pathname === "/stay";
  const isDetailsPage = location.pathname.startsWith("/stay/");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  function onOpenFilter() {
    setIsFilterOpen(true);
  }

  function onCloseFilter(){
    setIsFilterOpen(false)
  }

  return (
    !isDetailsPage ? (
      <header className="app-header-mobile">
        {isHomePage && !isFilterOpen && (
          <AppHeaderMobileTop onOpenFilter={onOpenFilter} />
        )}
        {!isDetailsPage && !isFilterOpen && <AppHeaderMobileBottom />}
        {isFilterOpen && <StayFilterMobile onCloseFilter={onCloseFilter} />}
      </header>
    ) : null
  )
}
