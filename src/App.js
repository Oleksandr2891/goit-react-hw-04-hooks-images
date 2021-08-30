import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from "../src/style/GlobalStyle";
import ImageGallery from './Components/ImageGallery/ImageGallery';
import Searchbar from './Components/Seachbar/Searchbar';


export default function App() {
  const [imageNameSearch, setImageNameSearch] = useState('');


  const handleFormSubmit = imageNameSearch => {
    setImageNameSearch(imageNameSearch);
  }


  return (
    <>
      <GlobalStyles />
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery nameSearch={imageNameSearch} />
      <ToastContainer />
    </>
  );

}


