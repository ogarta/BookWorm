import Card from 'react-bootstrap/Card';
import './index.scss';
import IMAGE from '../../../assets/index';
import { Link, useNavigate } from 'react-router-dom';

export default function ItemCardComponent(props) {
    let navigate = useNavigate();
    const book = props.dataBook;
    const {
        id,
        book_title,
        book_price,
        book_cover_photo,
        book_description,
        author_name,
        category_name,
        count_review,
        avg_rating_star,
        final_price,
        sub_price,
        discount_price,
    } = book;

    function handleClick() {
        navigate(`/product/${id}`);
    };
    const renderPrice = () => {
        if (book_price == final_price) {
            return <Card.Text className="price card-title" id="final_price">${book_price}</Card.Text>;
        }

        return (
            <Card.Text className="price card-title">
                <span className="text-secondary" ><del>${book_price}</del></span>

                <span className="font-weight-bold" id="final_price"> ${final_price}</span>
            </Card.Text>

        );
    };

    return (
        <Card border="dark" className="card-item" onClick={() => handleClick()}>
            <Card.Img variant="top" className='card-image' src={book_cover_photo ? IMAGE[book_cover_photo] : IMAGE['Empty']} alt={book_cover_photo} />
            <Card.Body>
                <Card.Title id="book_title">{book_title}</Card.Title>
                <Card.Text>{author_name}</Card.Text>
            </Card.Body>
            <Card.Footer variant="bottom" className="card-footer">
                {renderPrice()}
            </Card.Footer>
        </Card>
    );
}

