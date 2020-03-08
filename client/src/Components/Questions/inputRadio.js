import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
// import { deleteItem } from '../../Store/Actions/ItemsAction';

const Product = ({questionId, choises}) => {
    const dispatch = useDispatch();
    // const deleteProduct = (id) => {
    //     dispatch(deleteItem(id))
    // } onClick={() => deleteProduct(item.id)}
    const choiseList = choises.map((choise, index) => {
        const option = JSON.parse(choise);
        return(
            <div key={index}>
                <input type="radio" name={questionId} value={option.isCorrect} required />
                <label htmlFor={questionId}>{option.answer}</label>
            </div>
        )
    })

    return(<div>{choiseList}</div>);
}

export default Product;