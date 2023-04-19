import React, { useRef, useState, useEffect } from 'react'
import { Box, TextField, Container, Typography, Button } from '@mui/material'
import Loading from '../../components/Loading/Loading'
import axios from 'axios';
import { AuthState } from '../../context/AuthContext';

function Contact() {
    const [contact, setContact] = useState("");
    const {user, authDispatch } = AuthState();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const opinionRef = useRef(null);
    const errorDescription = useRef(null);
    const successMessage = useRef(null);
    const userID = user._id;

    useEffect(() => {
        const fetchContacts= async () => {
            setLoading(true);
            try{
                const response = await axios.get(`/contacts/${userID}`);
                setData(response.data);
            }catch(error){
                setError(error)
            }
            setLoading(false);
        };
        fetchContacts();
    }, []);


    const handleADDContact = async (event) => {
        event.preventDefault();
        const message = opinionRef.current.value;
        if (message.length < 8) {
            return errorDescription.current.textContent = "Your Contact Message Must Contain at least 8 Caracters.";
        } else {
            errorDescription.current.textContent = "";
        }

        try {
            setLoading(true);
            const savedContact = await axios.post(`/contacts/${userID}`, { contact_message: contact });
            setLoading(false)
            setData([...data, savedContact.data]);
            successMessage.current.textContent = 'Your Contact added Successfully';
            opinionRef.current.value = "";
            setTimeout(()=>{
                successMessage.current.textContent = "";
            }, 2000);

        } catch (error) {
            console.log(error.response.data.message)
            setError(error.response.data.message);
            alert("Somthing Went Wrong !!!!!")
            return
        }
    }

    const handleDeleteContact = async(item)=>{
        try{
            setLoading(true)
            await axios.delete(`/contacts/${userID}`, { data: { contact_id: item._id } })
            setLoading(false)
            successMessage.current.textContent = 'Your Contact Was Deleted Successfully';
            setTimeout(()=>{
                successMessage.current.textContent = "";
            }, 2000)
            setData(data.filter(contact => contact._id !== item._id));
        }catch(error){
            setError(error.response.data.message)
            alert(error);
            return
        }
    }


    return (
        <Box sx={{ bgcolor: "silver", pt: 5 }}>
            <Container
                sx={{
                    '& .MuiTextField-root': { m: 1, width: { xs: '25ch', md: '50ch' } },
                    pb: 5,
                    width: "50%", m: 'auto'
                }}
            >
                <Box component="form" onSubmit={handleADDContact}>
                    <Typography variant='h6' sx={{ m: 1 }}>Contact us :</Typography>
                    <TextField
                        label="Contact us"
                        multiline
                        rows={5}
                        onChange={(e) => setContact(e.target.value)}
                        inputRef={opinionRef}
                    />
                    <Typography varaint='caption' ref={errorDescription} sx={{ color: "red", m: 1 }} ></Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ m: 2 }}
                        disabled={loading}
                    >
                        add contact
                    </Button>
                </Box>
            </Container>
            <Typography variant='h6' ref={successMessage} sx={{ color: "green", m: 1, textAlign:"center" }} ></Typography>
            <Box sx={{ border: "1px solid back", width: "60%", m: "auto", pb: 10, }}>
                <Typography variant='h6' sx={{ ml:3 }} >Your Previous Contacts : </Typography>
                {error ? <Typography variant='h6' sx={{color:"red", textAlign:"center", mt:5}}>Something Wen Wrong</Typography>
                :
                loading ?
                    <Loading />
                    :
                    <>
                        {data.map((item, index) => (
                            <Box sx={{ color: "purple", border: "1px solid purple", m: 2, p: 2 }} key={index}>
                                <span>Contact N°{index + 1} : </span>
                                <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.8)" }}>{item.contact_message}</Typography>
                                <Button variant='outlined' color="error" sx={{ mt: 2 }} disabled={loading} onClick={() =>handleDeleteContact(item)}>DELETE</Button>
                            </Box>
                        ))}
                    </>
                }
            </Box>
        </Box>
    )
}

export default Contact