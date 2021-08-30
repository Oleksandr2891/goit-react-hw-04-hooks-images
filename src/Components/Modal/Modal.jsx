import { useState, useEffect } from "react";
import { Overlay } from "./ModalStyled";
import PropTypes from 'prop-types';
import LoaderSpiner from "../Loader/Loader";


export default function Modal({ closeModal, children }) {
    const [onLoadImage, setOnLoadImage] = useState(false);

    const showLoaderForSrc = () => {
        const imageIsLoad = document.querySelector(".imageInModal");
        setOnLoadImage(true);
        if (imageIsLoad) imageIsLoad.onload = function () {
            setOnLoadImage(false);
        };
    };

    useEffect(() => {
        window.addEventListener("keydown", handleEscape);
        const body = document.querySelector("body");
        body.style.overflow = "hidden";
        showLoaderForSrc();
        return () => {
            window.removeEventListener("keydown", handleEscape);
            const body = document.querySelector("body");
            body.style.overflow = "auto";
        }
    }, [])



    const handleEscape = (e) => e.code === "Escape" && this.props.closeModal();

    const onOverlayClick = ({ target, currentTarget }) => {
        target === currentTarget && closeModal();
    };


    return (
        <Overlay onClick={onOverlayClick}>
            <div className='modal'>
                {onLoadImage ? <LoaderSpiner /> : children}
            </div>
        </Overlay>
    );

}


Modal.propTypes = {
    children: PropTypes.object,
}