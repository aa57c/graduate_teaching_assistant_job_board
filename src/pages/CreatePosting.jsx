import '../App.css';
import NavBar from '../navigation/NavBar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Checkbox, FormControlLabel } from '@mui/material';
import React, {useState, useEffect} from 'react';
import store from '../store';
//import { useHistory } from 'react-router';

function CreatePosting(){
    const [Class, setClass] = useState('');
    const [SectionID, setSectionID] = useState('');
    const [JobTitle, setJobTitle] = useState('');
    const [is_GTA_Required, setIs_GTA_Required] = useState(false);

    const adminName = store.getState().auth.user.decoded.name;

    async function checkDuplicateClass(){
        let response = await fetch(`https://job-board-backend-yq3b.onrender.com/find-class?class=${Class}&section=${SectionID}`, {method: 'GET'});
        let classFound = await response.json();
        if(classFound.length === 0){
            //console.log(classFound);
            return false
        }
        else{
            return true;
        }

    }

    async function createPosting(){
        let isClassFound = await checkDuplicateClass();
        //console.log("Does this class exist in the database?: " + isClassFound ? "yes" : "no");
        let data ={
            class : Class,
            section : SectionID,
            job : JobTitle,
            admin : adminName,
            isGTARequired : is_GTA_Required
        };
        //console.log("Are fields empty?: " + Class === "" ? "yes" : "no");
        //added this if condition
        if(isClassFound){
            //console.log("class was found in the database");
            alert('posting created!');
            const ctrl = new AbortController();
            setTimeout(() => ctrl.abort(), 5000);
            try{
                //changed backend endpoint to update posting
                let request = await fetch("https://job-board-backend-yq3b.onrender.com/update-posting",
                {method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({class: data.class, section: data.section, job: data.job, isGTARequired: data.isGTARequired}),
                signal: ctrl.signal})
                console.log("HTTP response code", request.status);
            }catch(e){
                console.log("something went wrong");

            }

        }
        else{
            console.log("class was not found in the database");
            alert('posting created!');
            const ctrl = new AbortController();
            setTimeout(() => ctrl.abort(), 5000);
            try{
                let request = await fetch("https://job-board-backend-yq3b.onrender.com/create-posting", 
                {method: 'POST', 
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify(data), 
                signal: ctrl.signal});
                console.log("HTTP response code", request.status);
            }
            catch(e){
                console.log("something went wrong");
            }

        }
    }



    return(
        <div className="App">
            <div>
                <NavBar/>
            </div>
            <h1>Create Posting</h1>
            <br></br>
            <Box 
            component={"form"} 
            sx={{'& .MuiTextField-root' : {m: 1, width: '25ch'},
            }} 
            noValidate
            autoComplete="off"
            >
                <TextField size='small' value={Class} onChange={(event) => setClass(event.target.value)} required id='outlined-required' label='Enter Class' placeholder='Enter Class'/>
                <TextField size='small' value={SectionID} onChange={(event) => setSectionID(event.target.value)} required id='outlined-required' label='Enter Section' placeholder='Enter Section'/>
                <TextField size='small' value={JobTitle} onChange={(event) => {setJobTitle(event.target.value)}} required id='outlined-required' label='Enter Job Title' placeholder='Enter Job Title'/>
                <FormControlLabel control={<Checkbox onChange={() => setIs_GTA_Required(!is_GTA_Required)} />} label="Is GTA Required?"/>
                <Button onClick={createPosting} variant='contained'>Add Posting</Button>
            </Box>
            




        </div>
    )
}
export default CreatePosting;
