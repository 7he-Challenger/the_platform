import {useState } from 'react'

export default function Register() {
    const [inputs, setInputs] = useState({});
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleRegister = (event) => {
        event.preventDefault();
        alert(inputs);
      }
     
    return (
        <div className="Register">
                <form onSubmit={handleRegister}>

                    <label htmlFor="first name">First Name:
                        <input 
                            type="text" 
                            value={inputs.first_name || ""}
                            name="first_name"  
                            required
                            onChange={handleChange}
                        />
                    </label>

                    <label htmlFor="last name">Last Name: 
                        <input 
                            type="text" 
                            value={inputs.last_name || ""}
                            name="last_name" 
                            required
                            onChange={handleChange}
                        />
                    </label>

                    <label htmlFor="num">Number: 
                        <input
                            type="number"
                            value={inputs.num || ""}
                            name="num"
                            max={10}
                            required
                            onChange={handleChange}
                        />
                    </label>

                    <label htmlFor="email">E-mail: </label>
                        <input
                            type="email"
                            value={inputs.email || ""} 
                            name="email"  
                            required
                            onChange={handleChange}
                        /> 

                    <label htmlFor="pswrd">Password: 
                        <input 
                            type="password" 
                            value={inputs.pswrd || ""} 
                            name="pswrd" 
                            pattern="[a-z0-9]{1,15}" 
                            title="The password should at least contain 1 letter, a number or symbol, at least 8 characters."
                            onChange={handleChange}
                        />
                    </label>
            
                        <button type="submit">Register</button>
                </form>
            
        </div>
    )
  }