import {useState} from 'react';
import {collection, query, where, getDocs} from 'firebase/firestore';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { firestore } from '@/firebase';


// const SearchBar = ({handleSearchChange}) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [results, setResults] = useState([]);

//     const handleSearch = async (e) => {
//         e.preventDefault(e)
//     const querySnapshot = await getDocs(query(collection(firestore, 'inventory')))
//     const searchResults = []
//     querySnapshot.forEach((doc) => {
//         searchResults.push({
//             name: doc.id,
//             ...doc.data(),
//         })
//         setResults(searchResults)
        
//     });
//     };

//     const handleChange = async (e) => {
//         setSearchTerm(e.target.value);
//         // handleSearchChange(e.target.value)
//     }

//     const filteredInventory = results.filter(item => 
//         item.name.toLowerCase().includes(searchTerm.toLowerCase())
//     )

//     return(
//         <Container>
//             {/* <Box component="form" onChange={handleSearch} sx={{mt: 3}}>
//                 <TextField 
//                     variant='outlined'
//                     fullWidth
//                     label="Search"
//                     value={searchTerm}
//                     onChange={handleChange}
//                 />
//                 <Button type='submit' variant='contained' color='primary' sx={{mt: 2}}>Search</Button>
//             </Box>

//             <Box sx={{mt: 3, overflow:"scroll", maxHeight: "20%"}}>
//                 {filteredInventory.map(({name, quantity}) => (
//                     <Box key={name} sx={{mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px'}}>
//                         <Typography variant='h6'>{name}</Typography>
//                         <Typography>{quantity}</Typography>
//                     </Box>
//                 ))}
//             </Box> */}
//         </Container>
//     );
// };
const SearchBar = () => {

}
export default SearchBar;