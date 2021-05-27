const isImageLink = (props, propName, componentName) => {
    const regExp = /^(https?:\/\/)(.+)\.(png|jpg|jpeg)/ ;
    const value = props[propName];
    
    if(!value || !regExp.test(value)) {
        throw new Error(`Проп ${propName} компонента ${componentName} имеет неправильное значение`);
    }
}

export {isImageLink}