import shopApi from '../../../adapters/shopPageAdapter';
import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { updateFilter } from '../../../reducers/filterReducer';
import { useDispatch, useSelector } from 'react-redux';

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
            console.log(response);
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
        dispatch(updateFilter({
            author: valueAuthor,
            category: valueCategory,
            star: valueStar,
        }));
    }, [valueStar, valueAuthor, valueCategory]);

    console.log(useSelector(state => state.filterReducer.filter));
    return (
        <div>
            <Accordion defaultActiveKey={['1', '2', '0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Category</Accordion.Header>
                    <Accordion.Body>
                        <div className='row'>
                            {listCategory.data && listCategory.data.map((category, idx) => (
                                <div
                                    key={category.id}
                                    onClick={() =>
                                        setValueCategory(category)
                                    }
                                >
                                    {category.category_name}
                                </div>
                            ))}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Author</Accordion.Header>
                    <Accordion.Body>
                        <div className='row'>
                            {listAuthor.data && listAuthor.data.map((author, idx) => (
                                <div
                                    key={author.id}
                                    onClick={() =>
                                        setValueAuthor(author)
                                    }
                                >
                                    {author.author_name}
                                </div>
                            ))}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Star</Accordion.Header>
                    <Accordion.Body >
                        <div className="row">
                            {listStar.map((star, idx) => (
                                <div
                                    key={star.value}
                                    onClick={() =>
                                        setValueStart(star.value)
                                    }
                                >
                                    {star.name}
                                </div>
                            ))}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div >
    );
}

export default FilterComponent;