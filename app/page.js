'use client'
import Image from "next/image";
import {useState, useEffect} from 'react';
import { firestore } from "@/firebase";
import { collection, deleteDoc, doc, getDocs, query, getDoc, setDoc } from "firebase/firestore";
import {Box, Modal, Typography, Stack, TextField, Button, Container, BottomNavigation} from '@mui/material';
import SearchBar from '../components/SearchBar';

export default function Home() {
    const [inventory, setInventory] = useState([])
    const [open, setOpen] = useState(false)
    const [itemName, setItemName] = useState('')
    const [count, setQuantity] = useState('')
    
    const updateInventory = async () => {
        const snapshot = query(collection(firestore, 'inventory'))
        const docs = await getDocs(snapshot)
        const inventoryList = []
        docs.forEach((doc)=>{
            inventoryList.push({
                name: doc.id,
                ...doc.data(),
            })
        })
        setInventory(inventoryList)
    }

    const removeItem = async (item) =>{
        const docRef = doc(collection(firestore, 'inventory'), item)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()){
            const {quantity} = docSnap.data()
            if (quantity === 1) {
                await deleteDoc(docRef)
            } else if (quantity == 0) {
                window.alert('You removed the item')
            }
            else {
                await setDoc(docRef, {quantity: quantity - 1})
            }
        }
        await updateInventory()
    }

    const deleteItem = async(item) =>{
        const docRef = doc(collection(firestore, 'inventory'), item)
        await deleteDoc(docRef)
        await updateInventory()
    }

    const addItem = async (item) =>{
        const docRef = doc(collection(firestore, 'inventory'), item)
        const docSnap = await getDoc(docRef)
        
        if(docSnap.exists()){
            const {quantity} = docSnap.data()
            await setDoc(docRef, {quantity: parseInt(quantity) + 1}, { merge: true})
        } else {
            await setDoc(docRef, {quantity: count})
        }

        await updateInventory()
    }
    
    const updateItem = async (item) =>{
        const docRef = doc(collection(firestore, 'inventory'), item)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()){
            const {quantity} = docSnap.data()
            await setDoc(docRef, { quantity: count }, { merge: true })
        }

        await updateInventory()
    }

    useEffect(()=>{
        updateInventory()
    }, [])

    const handleOpen = (modalName) => setOpen(modalName)
    const handleClose = () => setOpen(null)

    // Search Functions

    const [searchTerm, setSearchTerm] = useState('')

    const handleSearchChange = (term) => {
        setSearchTerm(term.target.value)
    }

    const filteredInventory = inventory.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
 return (
 <Box 
    width="100vw"
    height="100vh"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    overflow="auto"
    gap={2}
 >
    {/* Update Modal */}
    <Modal open={open === 'updateItem'} onClose={handleClose}>
    <Box
        position="absolute" top="50%" left="50%"
        width={400}
        bgcolor="white"
        border="2px solid black"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={3}
        sx={{
            transform: "translate(-50%,-50%)"
        }}
        >
            <Typography variant="h6">Update Item</Typography>
            <Stack width="100%" direction="row" spacing={2}>
                <TextField 
                variant="outlined"
                fullWidth
                type="number"
                placeholder="Quantity"
                value={count}
                onChange={(e) => {
                    setQuantity(e.target.value)
                }}
                />
                <Button
                variant="outlined" onClick={() => {
                    updateItem(itemName)
                    setQuantity('')
                    handleClose()
                }}
                >Update</Button>
                <Button
                variant="outlined" onClick={() => {
                    deleteItem(itemName)
                    handleClose()
                }}
                >Delete</Button>
            </Stack>
        </Box>
    </Modal>

    <Modal open={open === 'addItem'} onClose={handleClose}>
        <Box
        position="absolute" top="50%" left="50%"
        width={400}
        bgcolor="white"
        border="2px solid black"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={3}
        sx={{
            transform: "translate(-50%,-50%)"
        }}
        >
            <Typography variant="h6">Add Item</Typography>
            <Stack width="100%" direction="row" spacing={2}>
                <TextField 
                variant="outlined"
                fullWidth
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => {
                    setItemName(e.target.value)
                }}
                />
                <TextField 
                variant="outlined"
                fullWidth
                placeholder="Quantity"
                type="number"
                value={count}
                onChange={(e) => {
                    setQuantity(e.target.value)
                }}
                />
                <Button
                variant="outlined" onClick={() => {
                    addItem(itemName)
                    setItemName('')
                    setQuantity('')
                    handleClose()
                }}
                >Add</Button>
            </Stack>
        </Box>
    </Modal>
    
    {/* Search Bar */}
    <Container display="flex" alignContent="center">
      <Typography variant="h3" component="h1" color="darkmagenta" fontFamily="cursive" fontStyle="italic">
        Pantry Tracker
      </Typography>
      <SearchBar handleSearchChange={searchTerm} />
      
      <Box component="form" onChange={updateInventory} sx={{mt: 3}}>
                <TextField 
                    variant='outlined'
                    fullWidth
                    label="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </Box>
    </Container>
    
  
         
{/* Items */}

    <Button variant="contained" onClick={() => {
        handleOpen('addItem')
    }}>
        Add New Item
    </Button>
    <Box border="1px solid #333"
        sx={{width: {xs: "100%", md: "60%"}, background: "linear-gradient(white, #a3f7e9 )"}}
        >
            <Box 
            // width="800px"
            height="85px"
            bgcolor="#ADD8E6"
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
                <Typography variant="h2" color="#333" boxSizing="border-box">
                    Items List
                </Typography>
            </Box>
    
    <Stack
    width="auto"
    boxSizing="border-box"
    sx={{height: {xs: "56vh", md: "50vh"}}}
    overflow="auto"
    spacing={2}
    >  
        <Box width="40%" margin={0} color="gray" display="flex" justifyContent="space-between">
            <Typography marginLeft="3.5em">Item Name</Typography>
            <Typography marginLeft="6.5em">Quantity</Typography>
        </Box>
        {
            filteredInventory.map(({name, quantity}) => (
                <Box 
                 key={name}
                 width="100%"
                 minHeight="150px"
                 display="flex"
                 alignItems="center"
                 justifyContent="space-between"
                 bgColor="#f0f0f0"
                 padding={5}
                 border="1px dashed gray"
                 borderRadius="25px"
                 sx={{flexDirection: {xs: "column", md: "row"}}}
                 >
                    <Stack display="flex"
                    direction="row"
                    justifyContent="space-between"
                    sx={{width: {xs: "100%", md: "40%"}, marginBottom: {xs: "10px"}}}
                    >
                    <Typography 
                        variant='h3' 
                        color='#333'
                        textAlign="center"
                    >
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Typography>
                    <Typography variant="h3" color="#333" textAlign="center" marginLeft="10px">
                        {quantity}
                    </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={() => {
                        addItem(name)
                    }}>Add</Button>
                    <Button variant="contained" onClick={() => {
                        handleOpen('updateItem')
                        setItemName(name)
                        setQuantity(count)
                    }}>Update</Button>
                    
                    <Button variant="contained" onClick={() => {
                        removeItem(name)
                    }}>Remove</Button>
                 </Stack>
                 </Box>
            ))
        }
    </Stack>
    </Box>
        {/* Footer */}
        <Box 
        width="100%"
        height="8vh"
        display="flex"
        justifyContent= "center"
        alignItems="center"
        sx={{background: "linear-gradient(to right, white, #2fd6ba)"}}
        >
            <Typography variant="h4" component="h1" color="darkblue" fontFamily="cursive" fontStyle="italic" marginLeft="15px">
        Pantry Tracker
      </Typography>
        </Box>
    </Box>
 )
}
