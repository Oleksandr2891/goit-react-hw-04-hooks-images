import { useState, useEffect } from "react";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import { toast } from "react-toastify";
import Api from "../../utils/Api";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import LoaderSpiner from "../Loader/Loader";
import { ImageGalleryList } from "./ImageGalleryStyled";
import "react-toastify/dist/ReactToastify.css";

export default function ImageGallery({ nameSearch }) {
    const [page, setPage] = useState(1);
    const [imageData, setImageData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [onLoadImage, setOnLoadImage] = useState(false);
    const [imagePath, setImagePath] = useState("");
    const notifySuccess = () => toast.success("Поиск успешно выполнен!!!");
    const notifyError = () => toast.error("По вашему запросу ничего не найдено");
    const getListImageGallery = async (nameSearch, page) => {
        setIsModalOpen(true);
        setOnLoadImage(true);
        try {
            const response = await Api(nameSearch, page);
            if (response.length) {
                setImageData((prevImageData) =>
                    prevImageData ? [...prevImageData, ...response] : response
                );
                (nameSearch !== '') && notifySuccess();
            } else {
                return notifyError();
            }
        } catch (error) {
            alert(error);
        } finally {
            setIsModalOpen(false);
            setOnLoadImage(false);
            page !== 1 && window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
            });

        }
    };

    useEffect(() => {
        if (nameSearch !== "") {
            setImageData([])
            getListImageGallery(nameSearch, page);
        } else {
            return false;
        }
    }, [nameSearch]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (page !== 1) getListImageGallery(nameSearch, page);
    }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

    const closeModal = () => {
        setIsModalOpen(false);
        setImagePath("");
    };
    const openModalWithImage = (path) => {
        setIsModalOpen(true);
        setImagePath(path);
    };
    const onHandleLoadMore = () => setPage((prevPage) => prevPage + 1);
    return (
        <>
            <ImageGalleryList>
                {imageData &&
                    imageData.map(({ id, webformatURL, largeImageURL, tag }) => {
                        return (
                            <ImageGalleryItem
                                key={id}
                                id={id}
                                tag={tag}
                                webformatURL={webformatURL}
                                largeImageURL={largeImageURL}
                                openModalWithImage={openModalWithImage}
                            />
                        );
                    })}
            </ImageGalleryList>
            {!!imageData?.length && <Button onHandleLoadMore={onHandleLoadMore} />}
            {isModalOpen && (
                <Modal closeModal={closeModal}>
                    {onLoadImage ? (
                        <LoaderSpiner />
                    ) : (
                        <img
                            src={imagePath}
                            width="1000"
                            height="800"
                            alt="ItisPhoto"
                            className="imageInModal"
                        />
                    )}
                </Modal>
            )}
        </>
    );
}



