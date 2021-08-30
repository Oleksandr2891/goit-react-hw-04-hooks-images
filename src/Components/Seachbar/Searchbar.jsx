import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchbarWrapper } from './SearchbarStyled';


export default function Searchbar({ onSubmit }) {
    const [imageNameSearch, setImageNameSearch] = useState('');


    const handleImageNameChange = event => {
        setImageNameSearch(event.currentTarget.value.toLowerCase())
    }


    const handleSubmit = event => {
        event.preventDefault();

        const notify = () => toast.warn('Для нового поиска изображения необходимо ввести слово!');
        if (imageNameSearch.trim() === '' & imageNameSearch.length) {
            notify();
            return;
        }

        onSubmit(imageNameSearch);
        setImageNameSearch('');
    }


    return (
        <SearchbarWrapper>
            <form className="SearchForm" onSubmit={handleSubmit}>
                <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                </button>

                <input
                    className="SearchForm-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    name="imageNameSearch"
                    onChange={handleImageNameChange}
                />
            </form>
        </SearchbarWrapper>
    );
}

