import "../../App.css"
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {useUserContext} from '../../context/userContext';

const Home = ()=>{
    const {user} = useUserContext();

    return (
        <div className="Home">
            <div className="Home-content">
                <h1>Simplify Your Problem-Solving Journey.</h1>
                <p>Explore, save, and conquer coding challenges with our platform. Discover a world of programming problems, organize them efficiently, and track your progress as you master the art of coding. Your personalized coding journey starts here. Join us today!</p>
                <div>
                {
                    user?
                    <Button style={{border:"1px solid black",color:"white",backgroundColor:"#2d2e3b"}} variant="Outlined" endIcon={<SendIcon />}
                    href="/problemset"
                    >Navigate to Problem Set</Button>
                    :
                    <Button style={{border:"1px solid black",color:"white",backgroundColor:"#2d2e3b"}} variant="Outlined" endIcon={<SendIcon />}
                    href="/login"
                    >Login to continue</Button>                   
                }

                </div>
            </div>
        </div>
    )
}

export default Home;