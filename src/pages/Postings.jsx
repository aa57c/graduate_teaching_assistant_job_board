import React, { useState } from 'react';
import '../App.css';
import NavBar from '../navigation/NavBar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
function Postings(){
    //gets a properties from the last page visited (in this case with the workflow, after someone clicks see postings under a class on the home page
    // the properties get redirected here)
    const location = useLocation();
    const card = location.state?.card;
    const [postInfo, setPostInfo] = useState([]);
    useEffect(() => {
        async function getPostings(){
            const response = await fetch(`https://job-board-backend-yq3b.onrender.com/postings`);
            if(response.ok){
                //const message = `An error occurred: ${response.statusText}`;
                //window.alert(message);
                let postInfo = await response.json()
                setPostInfo(postInfo);
                return;
            }
        }
        getPostings();
        return;
    }, [postInfo.length])

    //function that returns a JSX element of the list of postings for that class
    function postList(){
        return(
            <Grid container spacing={2} direction="row" justifyContent='center' alignItems={'flex-start'}>
                {
                    postInfo.map((post) => {
                        if(post.className === card.className){
                            return(
                                <Grid item xs={12} sm={6} md={3}>
                                    <Box display='inline-block'>
                                        <Card sx={{minWidth: 275}}>
                                            <CardContent>
                                                <Typography variant='h4' component='div'>
                                                    {post.postings[0].job_title}
                                                </Typography>
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                    {post.postings[0].GTA_CERT ? "GTA is required" : "GTA is not required"}
                                                </Typography>
                                                <CardActions>
                                                    <Link to={{pathname: '/login', 
                                                        state: {
                                                        posting: post.postings[0],
                                                        className: card.className,
                                                        sectionID: card.sectionID}}}>
                                                        <Button>Apply</Button>
                                                    </Link>
                                                </CardActions>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardContent>
                                                <Typography variant='h4' component='div'>
                                                    {post.postings[1].job_title}
                                                </Typography>
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                    {post.postings[1].GTA_CERT ? "GTA is required" : "GTA is not required"}
                                                </Typography>
                                                <CardActions>
                                                    <Link to={{pathname: '/login', 
                                                            state: {
                                                            posting: post.postings[1], 
                                                            className: card.className, 
                                                            sectionID: card.sectionID}}}>
                                                        <Button>Apply</Button>
                                                    </Link>
                                                </CardActions>
                                            </CardContent>
                                        </Card>
                                    </Box>

                                </Grid>

                            )
                        }
                    })
                }

            </Grid>
        )
    }
 
    return(
        <>
            <div className='App'>
                <div>
                    <NavBar />
                </div>
                <h1> Postings </h1>
                <h2>
                    {`Classname: `+ card.className + ", Section ID: " + card.sectionID}
                </h2>    
            </div>
            {postList()}
        </>
        
    );
}
export default Postings;
