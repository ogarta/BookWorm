import Card from 'react-bootstrap/Card';
import './index.scss';
import IMAGE from '../../../assets/index';
import { Link } from 'react-router-dom';

export default function ItemCardComponent(props) {
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



    const renderPrice = () => {
        if (book_price == final_price) {
            return <Card.Text className="price" id="final_price">${book_price}</Card.Text>;
        }

        return (
            <Card.Text className="price">
                <span className="text-secondary" ><del>${book_price}</del></span>

                <span className="font-weight-bold ms-3" id="final_price">${final_price}</span>
            </Card.Text>

        );
    };

    return (
        <Link to={`/product/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <div id="item">
                <Card border="dark" className="card-item">
                    <Card.Img className='card-image' variant="top" src={book_cover_photo ? IMAGE[book_cover_photo] : IMAGE['Empty']} alt={book_cover_photo} />
                    <Card.Body>
                        <Card.Title id="book_title">{book_title}</Card.Title>
                        <Card.Text>{author_name}</Card.Text>
                    </Card.Body>
                    <Card.Footer variant="bottom" className="card-footer">
                        {renderPrice()}
                    </Card.Footer>
                </Card>
            </div>
        </Link>
    );
}

