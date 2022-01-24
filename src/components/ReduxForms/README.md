# Redux-Form Fields

### The purpose:
- implement once, use everywhere
- eliminate the need of hundreds of onClick/onChange events/callbacks
- eliminate the need of hundreds state variables in form component




### Important:
- `input` property MUST be present in every Field component
- use `input` prop to access field data and some methods ( value, onChange(), etc)
- DO NOT return any onChange() callbacks from the Field component as we have this logic to avoid using them. 

### Everything you need already exist!!!
- submitting state of the form
- validation (field & form level)
- touched, pristine
- reset (could be used to reset form values)

<br/><br/><br/>


### The Field
```javascript
//#1. simple example of text input field
// input must be always present in the Field component
export default function({ input, label=''}){
    return(<input {...input} type='text' />)
}
```

## Redux-Form Field and Libraries
Often we should use some additional libraries while working with the forms.  
It could be styling libraries (Bootstrap) of JS libraries such as "react-select".

In this case, we would need to have some additional work.
But keep in mind, it is enough to have solution from code example #1 to make it work with redux-form.


```javascript
//#2. Redux-Form Field and Bootstrap
const Input = ({ input = {}, type = 'text', label = '',  placeholder = '',  extraClass = '', isRequired = false, disabled, meta: { touched, error, warning }}) => (
    <Form.Group className={`mb-3 ${styles['input-field']} input-field`} controlId={input.name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control {...input} type={type} placeholder={placeholder} readOnly={disabled ? true : false} />
    </Form.Group>
);
```

```javascript
//#3. Redux-Form Field and React-Select
const SelectInput = ({ input = {}, searchable=false, className='select', label = '', options = [], isMulti=false, placeholder='',  meta: { touched, error, warning } }) => {

    const onChangeEvent = (data) => {
        //Single value
        if(data?.value) input.onChange(data.value);

        //Multi-Select
        else if(Array.isArray(data)){
            input.onChange(data.map(item=>item.value));
        }
    };


    const calcValue=()=>{
        if(isMulti && Array.isArray(input.value)){
            return input.value.map(item=>{
                const option = options.find(optItem=> optItem['value'] === item);
                return {
                    label: option?.label || 'Record Not Exist',
                    value: item
                };
            });
        }else{
            return options.find(item=> item['value'] === input.value);
        }
    }

    return <Select
        name={input.name}
        className= {className}
        value={calcValue()}
        isMulti={isMulti}
        placeholder={placeholder}
        options={options}
        searchable={searchable}
        onChange={onChangeEvent}
    />;
};
```