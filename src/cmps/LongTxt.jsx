import { useState } from "react"

export function LongTxt({ txt, length = 400 }) {

    const [isShowFullTxt, setIsShowFullTxt] = useState(false)

    function onToggleIsShowFullTxt() {
        setIsShowFullTxt(isShowFullTxt => !isShowFullTxt)
    }

    const isLongText = txt.length > length
    const textToShow = (isShowFullTxt || !isLongText) ? txt : (txt.substring(0, length)) + '...'
    return (
        <section className="long-txt">
            <div>
                {textToShow}
                {isLongText &&
                    <div>
                        <button className="show-more-btn" onClick={onToggleIsShowFullTxt}>
                            <span className="btn-words" >
                                {isShowFullTxt
                                    ? (<> <img src="/svg/leftArrow.svg" /> Show less </>)
                                    : (<> Show more <img src="/svg/rightArrow.svg" /> </>)
                                }
                            </span>
                        </button>
                    </div>
                }
            </div>
        </section>
    )
}