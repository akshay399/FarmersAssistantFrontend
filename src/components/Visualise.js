import React ,{useEffect,useState} from 'react'
import useStyles from './newsStyles';
import Chart from "react-google-charts";
import firebase from 'firebase';
import { color } from '@mui/system';

const styles = {
    container:
    {
        display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 50,   
    }
}




export default function Visualise(props) {
    const {user} = props;
    var database = firebase.database();
    const classes = useStyles();
    const [nitrogen, setNitrogen] = useState();
    
    const [phosphorous, setPhosphorous] = useState();
    const [pottasium, setPottasium] = useState();
    const [ph, setPh] = useState();


    

    useEffect(() => {

         var data 
    var pulledN
    var pulledK
    var pulledP
    var pulledph

        console.log('in visualize useeffect');
        database.ref(user.uid).on("value", (snapshot)=>{
            data = snapshot.val();
           console.log("data", data)
           for(let i in data){
             console.log("this is i", i);
             console.log("in crop for loop in vis", data[i]);
             pulledN = data[i]['N'] || "7";
             pulledK = data[i]['K'] || "5"
             pulledP = data[i]['P'] || "9"
             pulledph = data[i]['ph'] || "4"

             console.log('pulledN',pulledN);
             
           }
           setNitrogen(pulledN);
             setPhosphorous(pulledP);
             setPottasium(pulledK);
             setPh(pulledph);
        })

       
    
    }, []);

    return (
        <div>
            <div className={classes.toolbar} />
            <div className={classes.toolbar} />
           
           <div style={{display:"flex",
                justifyContent:"center"}}>
            <Chart 
                // paddingTop="200"  
                // marginLeft="20px"
                
                width={800}
                height={600}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                ['Values', 'Levels'],
                ['N',Number(nitrogen)],
                ['P', Number(phosphorous)],
                ['K', Number(pottasium)],
                ['PH', Number(ph)],
                
                ]}
                options={{
                title: 'Live Crop Feed',
                chartArea: { width: '30%' },
                hAxis: {
                    title: 'Nutrients',
                    minValue: 0,
                },
                vAxis: {
                    title: 'Units',
                },
                }}
                legendToggle

        />
        </div>
        </div>
    )
}
