import { stayService } from "../services/stay/index.js"
import { stayAction } from "../store/actions/stay.actions.js"
import { useParams, useNavigate } from "react-router"
import { createRef, useRef, useEffect, useState } from "react"
import { uploadImg } from "../services/cloudinary.service.js"

export default function StayEdit() {
  const navigate = useNavigate()
  const { stayId } = useParams()
  const [stayToEdit, setStayToEdit] = useState(stayService.getEmptyStay())
  const fileInput = useRef([])
  fileInput.current = stayToEdit.imgUrls.map((_, i) => fileInput.current[i] ?? createRef())

  useEffect(() => {
    if (stayId) loadStay()
  }, [])

  async function loadStay() {
    try {
      const stay = await stayService.getById(stayId)
      setStayToEdit(stay)
    } catch (err) {
      console.log(err)
    }
  }

  function clickToUpload(index) {
    if (fileInput.current) {
      fileInput.current[index].current.click()
    }
  }

  async function onChangeImg(ev) {
    try {
      const url = await uploadImg(ev)
      let newStayToEdit = { ...stayToEdit }
      newStayToEdit.imgUrls[ev.target.id] = url
      setStayToEdit({ ...stayToEdit, ...newStayToEdit })
    } catch (err) {
      console.log(err)
    }
  }

  function onChangeString(ev) {
    setStayToEdit({ ...stayToEdit, [ev.target.id]: ev.target.value })
  }

  function onChangeLocation(ev) {
    const newLoc = { ...stayToEdit.loc, [ev.target.id]: ev.target.value }
    console.log(newLoc)
    setStayToEdit({ ...stayToEdit, loc: newLoc })
  }

  function onChangeNumber(ev) {
    setStayToEdit({ ...stayToEdit, [ev.target.id]: +ev.target.value })
  }

  function onSaveStay(ev) {
    ev.preventDefault()
    if (stayId) {
      stayAction.updateStay(stayToEdit)
    } else {
      stayAction.addStay(stayToEdit)

    }
    navigate('/stay')
  }
  if (!stayToEdit) return 'loading...'
  return (
    <form className="stay-edit" onSubmit={onSaveStay}>
      <div className="stay-name">
        <input id="name" type="text" placeholder="Stay name" value={stayToEdit.name}
          onInput={onChangeString} />
      </div>
      <div className="location">
        <input id="country" type="text" placeholder="Country" onInput={onChangeLocation} value={stayToEdit.loc.country} />
        <input id="city" type="text" placeholder="City" onInput={onChangeLocation} value={stayToEdit.loc.city} />
        <input id="address" type="text" placeholder="Address" onInput={onChangeLocation} value={stayToEdit.loc.address} />
      </div>
      <div className="images">
        {stayToEdit.imgUrls.map((img, index) => (
          <div id={index} onClick={() => clickToUpload(index)} className={`img img${index}`} key={index}>
            {img ? <img src={img} alt="" /> : <div><p>Upload Image</p></div>}
            <input ref={fileInput.current[index]} id={index} type="file" onChange={onChangeImg}  />
          </div>
        ))}
      </div>
      <div className="bottom-info">
        <span>Capacity:<input id="capacity" type="number" placeholder="0" onInput={onChangeNumber} value={stayToEdit.capacity}/></span>
        <span className="price">Price: <input id="price" type="number" placeholder="0" onInput={onChangeNumber} value={stayToEdit.price} />per night</span>
      </div>
      <div className="description">
        <h4>Description</h4>
        <textarea id="summary" className="description-textarea" value={stayToEdit.summary}
          onInput={onChangeString}></textarea>
      </div>
      <button className="save-btn" onClick={onSaveStay}>Save</button>
    </form>
  )
}
