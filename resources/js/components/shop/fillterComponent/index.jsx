import shopApi from '../../../adapters/shopPageAdapter';
import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { setAuthor, setFilterDetail, setCategory, setStar } from '../../../reducers/filterReducer';
import { useDispatch } from 'react-redux';
import { capitalizeFistLeter } from '../../../utils/captislize';
import './style.scss';

function FilterComponent() {
    const [listAuthor, setListAuthor] = useState({});
    const [listCategory, setListCategory] = useState({});
    const [valueAuthor, setValueAuthor] = useState("");
    const [valueCategory, setValueCategory] = useState("");
    const [valueStar, setValueStart] = useState("");

    const dispatch = useDispatch();

    const listStar = [
        { name: 'Star 1', value: '1' },
        { name: 'Star 2', value: '2' },
        { name: 'Star 3', value: '3' },
        { name: 'Star 4', value: '4' },
        { name: 'Star 5', value: '5' },
    ];
    useEffect(() => {
        const fetchAllAuthor = async () => {
            const response = await shopApi.getAllAuthor();
            setListAuthor(response);

        }
        const fetchAllCategory = async () => {
            const response = await shopApi.getAllCategory();
            setListCategory(response);
        }
        fetchAllCategory();
        fetchAllAuthor();
    }, []);

    useEffect(() => {
        dispatch(setAuthor(valueAuthor.id));
        dispatch(setFilterDetail({
            author_name: valueAuthor.author_name,
            category_name: valueCategory.category_name,
            star: valueStar,
        }));
    }, [valueAuthor]);

    useEffect(() => {
        dispatch(setCategory(valueCategory.id));
        dispatch(setFilterDetail({
            author_name: valueAuthor.author_name,
            category_name: valueCategory.category_name,
            star: valueStar,
        }));
    }, [valueCategory]);

    useEffect(() => {
        dispatch(setStar(valueStar));
        dispatch(setFilterDetail({
            author_name: valueAuthor.author_name,
            category_name: valueCategory.category_name,
            star: valueStar,
        }));
    }, [valueStar]);

    return (
        <div>
            <Accordion defaultActiveKey={['1', '2', '0']} alwaysOpen flush>
                <Accordion.Item eventKey="0" id="accordion-item">
                    <Accordion.Header id="accordion-header">Category</Accordion.Header>

                    {listCategory.data && listCategory.data.map((category, idx) => (
                        <Accordion.Body
                            className="category-item"
                            key={category.id}
                            style={{
                                backgroundColor: valueCategory === category ? "#B0ADAD" : "",
                            }}
                            onClick={() =>
                                setValueCategory(valueCategory === category ? "" : category)
                            }
                        >
                            {capitalizeFistLeter(category.category_name)}
                        </Accordion.Body>
                    ))}

                </Accordion.Item>
                <Accordion.Item eventKey="1" id="accordion-item">
                    <Accordion.Header id="accordion-header">Author</Accordion.Header>

                    {listAuthor.data && listAuthor.data.map((author, idx) => (
                        <Accordion.Body
                            className="author-item"
                            key={author.id}
                            style={{
                                backgroundColor: valueAuthor === author ? "#B0ADAD" : "",
                            }}
                            onClick={() =>
                                setValueAuthor(valueAuthor === author ? "" : author)
                            }

                        >
                            {author.author_name}
                        </Accordion.Body>
                    ))}

                </Accordion.Item>
                <Accordion.Item eventKey="2" id="accordion-item">
                    <Accordion.Header >Rating review</Accordion.Header>
                    {listStar.map((star, idx) => (
                        <Accordion.Body
                            className="star-item"
                            key={star.value}
                            style={{
                                backgroundColor: valueStar === star.value ? "#B0ADAD" : "",
                            }}
                            onClick={() =>
                                setValueStart(valueStar === star.value ? "" : star.value)
                            }
                        >
                            {star.name}
                        </Accordion.Body>
                    ))}
                </Accordion.Item>
            </Accordion>
        </div >
    );
}

export default FilterComponent;