export function MobileGallery({ stay }) {

    return (
        <div className="gallery-container">
            {stay.imgUrls.map((url, index) =>
                <img key={index} className={`img img-${index}`} src={url} />
            )}
        </div>
    )
}