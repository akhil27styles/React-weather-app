import React,{useEffect,useState} from 'react';
import './App.css';
import axios from 'axios';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      padding:'60px',
      fontFamily:'sanserief',
      fontSize:'20px',
    },
  }),
)
toast.configure();
function App() {
    const classes = useStyles();
    const [query, setQuery] = useState("");
    const [weather,setWeather]= useState("");
    const [condition,setcondition]=useState([]);
    const [speed,setspeed]=useState("");
    const [hum,sethum]=useState("");
    const [city,setcity]=useState("");
    const handle=(e)=>{
    
  
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`).then(response=>{
     
            setWeather(response.data.main.temp);
            setcondition(response.data.weather[0].description);
            sethum(response.data.main.humidity);
            setspeed(response.data.wind.speed);
            setcity(response.data.name);
        
            setQuery("");


      }) .catch(error => {
        console.log(error)
        toast.warn('City Not Found!',{position:toast.POSITION.TOP_CENTER});
         })
    }
    return (

        <div className="main-container">
           <Grid item xs>
          <Paper className={classes.paper}>Weather App
        <br/>  <TextField id="standard-basic" label="City" className="search"
            placeholder="Search.."
            value={query}
            onChange={(e)=>setQuery(e.target.value)}/><br/><br/>
                 <Button variant="contained" color="primary" onClick={handle}>
        Search
      </Button>
      <br/>
      {city}
          </Paper>
          
        </Grid>
        
          
     
        <br/> <br/> <br/>
             <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>Temp<br/><span class="material-icons">
ac_unit
</span>{weather}F</Paper>
        </Grid>

  
        
        <Grid item xs>
          <Paper className={classes.paper}>Condition<br/><span class="material-icons">cloud
</span>{condition}</Paper>
        </Grid>


        <Grid item xs>
          <Paper className={classes.paper}>Humidity<br/><span class="material-icons">
nature_people
</span>{hum}</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>Wind Speed<br/><span class="material-icons">
speed
</span>{speed}</Paper>
        </Grid>
      </Grid>

        </div>
      
    );
}

export default App;
