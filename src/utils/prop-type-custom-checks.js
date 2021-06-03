import PropTypes from 'prop-types';

const isImageLink = (props, propName, componentName) => {
    const regExp = /^(https?:\/\/)(.+)\.(png|jpg|jpeg)/ ;
    const value = props[propName];
    
    if(!value || !regExp.test(value)) {
        throw new Error(`Проп ${propName} компонента ${componentName} имеет неправильное значение`);
    }
};

const isIngredientDescriptorFull = {        
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.oneOf(["bun","sauce","main"]),
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: isImageLink,
    image_mobile: isImageLink,
    image_large: isImageLink,
    __v: PropTypes.number
};

export {isImageLink, isIngredientDescriptorFull}