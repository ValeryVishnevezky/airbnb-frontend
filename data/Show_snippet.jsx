const [searchParams, setSearchParams] = useSearchParams()
const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category'))
const [isScrollEnd, setIsScrollEnd] = useState(false)
const [isScrolled, setIsScrolled] = useState(false)
const [currentPos, setCurrentPos] = useState(0)
const [isMobile, setIsMobile] = useState(window.innerWidth < MaxMobileWidth)
const scrollRef = useRef(null)

useEffect(() => {
    window.addEventListener("scroll", handleScrollY)
    window.addEventListener("resize", handleMobileResize)
}, [])

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

function handleMobileResize() {
    setIsMobile(window.innerWidth < MaxMobileWidth)
}

function handleScrollY() {
    setIsScrolled(window.scrollY > 0)
}