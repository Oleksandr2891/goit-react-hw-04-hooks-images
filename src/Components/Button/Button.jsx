import { ButtonLoader } from "./ButtonStyled";
import PropTypes from 'prop-types';


const Button = ({ onHandleLoadMore }) => {
    const loadMore = () => onHandleLoadMore()
    return (
        <ButtonLoader>
            <button type="button" onClick={loadMore} className="Button">Load more</button>
        </ButtonLoader>
    );
}

export default Button;

Button.propTypes = {
    onHandleLoadMore: PropTypes.func,
}