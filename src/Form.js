import "./App.css";
import React, { useState, useEffect } from "react";
import * as yup from 'yup';
import axios from 'axios';



const yupForm = yup.object().shape({
    name: yup.string().required('name is required').min(2, 'name must be at least 2 characters'),
    size: yup.string().oneOf(['Small', 'Medium', 'Large', 'Extra Large'], 'You Must Choose A Size'),
    special: yup.string(),
    ham: yup.boolean(),
    bacon: yup.boolean(),
    pineapple: yup.boolean(),
    pepperoni: yup.boolean(),
})

const defaultVal = {
  name: "",
  size: "",
  special: "",
  ham: false,
  bacon: false,
  pineapple: false,
  pepperoni: false,

}

function Form() {

const [isValid, setIsValid] = useState(true);

const [form, setForm] = useState(defaultVal);

const [errorState, setError] = useState({
    name: "",
    size: "",
    special: "",
    ham: "",
    bacon: "",
    pineapple: "",
    pepperoni: "",
})

useEffect(() => {yupForm.isValid(form)
  .then(valid => {
    setIsValid(!valid)
  });
  }, [form]);


const validate = (e) => {
 yup.reach(yupForm, e.target.name)
 .validate(e.target.value)
 .then( valid => {
  setError({
      ...errorState,
      [e.target.name]: ""
    })
    
 })
 .catch(error => {
   console.log(error.errors)
   setError({
     ...errorState,
     [e.target.name]: error.errors[0]
   })
 })
};

const inputChange = e => {
  e.persist();
  validate(e)
  let value = e.target.type === "checkbox" ? e.target.checked : e.target.value
  setForm({...form, [e.target.name]: value });
};

const formSubmit = (e) => {
  e.preventDefault();
  axios.post('https://reqres.in/api/orders', form)
  .then(res => {console.log('RES', res)})
  .catch(err => console.log(err.response));
  setForm(defaultVal)
};

return (
  <div>
    <h1>ORDER BELOW!</h1>

<form onSubmit={formSubmit} id="pizza-form">
  <label htmlFor="name">Your Name: </label>
  <input 
    id="name-input" 
    name="name"
    type="text" 
    placeholder="Name" 
    value={form.name} 
    onChange={inputChange} 
  />
  </form>

  {errorState.name.length > 1 ? <p className="error">{errorState.name}</p> : null}
  
<p><label htmlFor="size-dropdown">Choose your size! </label>
  <select id="size-dropdown" name="size" value={form.size} onChange={inputChange}>
      <option>---Pick One---</option>
      <option value="Small">Small</option>
      <option value="Medium">Medium</option>
      <option value="Large">Large</option>
    </select>
  </p>
<p className="error">{errorState.size}</p>

  <label htmlFor="toppings">Choose Your Toppings:</label>
<p>
  <input 
    id="toppings" 
    type="checkbox" 
    checked={form.ham} 
    onChange={inputChange} 
    name="ham" 
  />Ham
  <input id="toppings" 
    type="checkbox" 
    checked={form.bacon} 
    onChange={inputChange} 
    name="bacon" 
  />Bacon
  <input 
    id="toppings" 
    type="checkbox" 
    checked={form.pineapple} 
    onChange={inputChange} 
    name="pineapple" 
  />Pineapple
  <input 
    id="toppings"  
    type="checkbox"  
    checked={form.pepperoni} 
    onChange={inputChange}  
    name="pepperoni" 
  />Pepperoni
  </p>
  <form onSubmit={formSubmit} id="special-text">
  <label htmlFor="special">Special: </label>
  <input 
    id="special-text" 
    special="special"
    type="text" 
    placeholder="Special" 
    value={form.special} 
    onChange={inputChange} 
  />
  </form>

  <button name="order-button" id="order-button" disabled={isValid} type="submit">
    Confirm Order
  </button>


</div>
);


}


export default Form;