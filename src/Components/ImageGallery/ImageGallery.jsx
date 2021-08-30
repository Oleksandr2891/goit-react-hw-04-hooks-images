import { useState, useEffect } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import Api from '../../utils/Api'
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import LoaderSpiner from "../Loader/Loader";
import { ImageGalleryList } from './ImageGalleryStyled';
import 'react-toastify/dist/ReactToastify.css';

export default function ImageGallery({ nameSearch }) {
    const [page, setPage] = useState(1);
    const [imageData, setImageData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [onLoadImage, setOnLoadImage] = useState(false);
    const [imagePath, setImagePath] = useState('');
    const [imageNameSearch, setImageNameSearch] = useState("");
    const notifySuccess = () => toast.success('Поиск успешно выполнен!!!');
    const notifyError = () => toast.error('По вашему запросу ничего не найдено');

    useEffect(() => {
        if (nameSearch !== '') {
            setImageNameSearch(nameSearch)
            setPage(1)
            getListImageGallery(imageNameSearch, page)
        } else { return false }
    }, [nameSearch]);

    useEffect(() => {
        if (page === 1) return false
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    }, [imageData])// eslint-disable-line
    const getListImageGallery = async (imageNameSearch, page) => {
        setIsModalOpen(true);
        setOnLoadImage(true);
        console.log(imageNameSearch);
        try {
            const response = await Api(imageNameSearch, page);
            if (response.length) {
                setImageData(prevImageData => prevImageData ? [...prevImageData, ...response] : response)
                notifySuccess();
            } else {
                return notifyError();
            }
        } catch (error) {
            alert(error);
        } finally {
            page !== 1 ?? window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            });
            setIsModalOpen(false);
            setOnLoadImage(false);
        }
    }
    const closeModal = () => {
        setIsModalOpen(false);
        setImagePath('');
    };
    const openModalWithImage = (path) => {
        setIsModalOpen(true);
        setImagePath(path);
    }
    const onHandleLoadMore = () => setPage(prevPage => prevPage + 1)
    return (
        <>
            <ImageGalleryList>
                {imageData && imageData.map(({ id, webformatURL, largeImageURL, tag }) => {
                    return < ImageGalleryItem
                        key={id}
                        id={id}
                        tag={tag}
                        webformatURL={webformatURL}
                        largeImageURL={largeImageURL}
                        openModalWithImage={openModalWithImage} />
                })}
            </ImageGalleryList>
            {imageData?.length && <Button onHandleLoadMore={onHandleLoadMore} />}
            {isModalOpen && (
                <Modal closeModal={closeModal}>
                    {onLoadImage ? <LoaderSpiner /> : <img src={imagePath} width="1000" height="800" alt="ItisPhoto" className="imageInModal" />}
                </Modal>
            )}
        </>
    );
}