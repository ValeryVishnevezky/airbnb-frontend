import { useSearchParams } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import { categories } from '../services/utils/categories.js'

export function StayCategories({ onSetFilter, filterBy }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category'))
    const [isScrollEnd, setIsScrollEnd] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [currentPos, setCurrentPos] = useState(0)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 745)
    const scrollRef = useRef(null)

    useEffect(() => {
        window.addEventListener("scroll", handleScrollY)
        window.addEventListener("resize", handleMobileResize)
    }, [])

    function handleMobileResize() {
        setIsMobile(window.innerWidth < 745)
    }

    function handleScrollY() {
        setIsScrolled(window.scrollY > 0)
    }

    function HandleScrollX(scalar) {
        const scrollAmount = scrollRef.current.clientWidth * 0.5 * scalar
        const scrollPos = scrollRef.current.scrollLeft + scrollAmount
        const isScrollEnd = Math.ceil(scrollPos + scrollRef.current.clientWidth)
            >= scrollRef.current.scrollWidth

        scrollRef.current.scrollLeft = scrollPos
        setCurrentPos(scrollPos)
        setIsScrollEnd(isScrollEnd)
    }

    function onSelectCategory(catName) {
        if (catName === selectedCategory) catName = ''
        onSetFilter({ ...filterBy, label: catName })
        setSelectedCategory(catName)
        setSearchParams({ category: catName })
    }

    return (
        <div className={`categories-outer-container
            ${isScrolled ? "cat-sticky" : "cat-not-sticky"} `}>
            {(currentPos > 0 && !isMobile) &&
                <button className="cat-button prev" onClick={() => HandleScrollX(-1)}>
                    <img src="/svg/leftArrow.svg" alt="Left arrow" />
                </button>
            }
            <section ref={scrollRef} className="categories-inner-container">
                {categories.map((category, index) =>
                    <div onClick={() => onSelectCategory(category.name)} key={category.name}
                        className={`category ${category.name} ${selectedCategory === category.name ? 'selected' : ''} `}
                        id={index}>
                        <img src={category.src} alt={category.name} />
                        <span>{category.name}</span>
                    </div>)}
            </section>
            {(!isScrollEnd && !isMobile) &&
                <button className="cat-button next" onClick={() => HandleScrollX(1)}>
                    <img src="/svg/rightArrow.svg" alt="Right arrow" />
                </button>
            }
        </div>
    )
}
