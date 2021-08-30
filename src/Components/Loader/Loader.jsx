import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoaderSpiner = () => {
    return (
        <>
            <Loader type="Puff" color="#51ff00" height={300} width={300} timeout={5000} />
        </>
    );
}

export default LoaderSpiner;

