import {useState} from 'react'




export default function Information(){

    const [formData, setFormData] = useState({
                title: '',
                objectives: '',
                services: '',
                message: ''
            })
        
            const handleOnChange = (e: any)=> {
                const {name, value} = e.target
                setFormData((prevData) =>({
                    ...prevData,
                    [name]: value
                }));
            };
            const handleSubmit = (e: any)=>{
                e.preventDefault();
        
            }

    return(
        <>
           <form action="">

           </form>
        </>
    );
}