import { GalleryItem } from "./GalleryItemStyled";
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tag, openModalWithImage }) => {
    const openImage = () => openModalWithImage(largeImageURL);

    return (

        < GalleryItem>
            <img src={webformatURL} alt={tag} className="ImageGalleryItem-image" onClick={openImage} />
        </ GalleryItem>

    );
}

export default ImageGalleryItem;


ImageGalleryItem.propTypes = {
    openModalWithImage: PropTypes.func,
    tag: PropTypes.string,
    largeImageURL: PropTypes.string,
    webformatURL: PropTypes.string,

}