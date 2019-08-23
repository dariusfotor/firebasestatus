import React, { Component } from 'react';
import Header from './header';
import Temp_graph from './tempgraph'
import * as firebase from 'firebase';
import './switch.css';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBwN5nkIv7tFYYLeL9nUBXr2TW43E76ZX8",
    authDomain: "durys-bf59d.firebaseapp.com",
    databaseURL: "https://durys-bf59d.firebaseio.com",
    projectId: "durys-bf59d",
    storageBucket: "durys-bf59d.appspot.com",
    messagingSenderId: "1069232893325"
  };
  firebase.initializeApp(config);

class Switch extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            on : 1,
            off : 0,
            status_switch: "",
            status_switch_txt: "",
            status_door: "",
            status_door_txt: "",
            door_count: [],
            time: [],
            temp: "",
            humidity: "",
            temp_over_27: "",
            valueTemp_over: "",
            newTempValue_over: "",
            chartData:{}
        }
        this.db_relay = firebase.database().ref().child('Reles_busena');
        this.db_door = firebase.database().ref().child('duru_sensor_status');
        this.db_door_log = firebase.database().ref().child("door_log"); 
        this.db_temp = firebase.database().ref().child("Temperatura");
        this.db_dregme = firebase.database().ref().child("Dregme");
        this.db_temp_over = firebase.database().ref().child("Temp_virs_27");

        // this.handleChange = this.handleChange.bind(this);

    }
// Reles busenos nuskaitymas is firebase
componentDidMount(){

    this.db_relay.on('value', data =>{
        this.setState({
            status_switch: data.val() 
        });
// Reles ijungimu atvaizdavimas DOMe
        const on_style = document.getElementById('on')
        if(data.val() === 1){
            on_style.style.backgroundColor = 'green'
            on_style.style.color = 'white'
            this.setState({  
                status_switch_txt: "Ijungta"
            })
            }
        else{
            on_style.style.backgroundColor = 'red'
            this.setState({
                status_switch_txt: "Isjungta"
            })
        }
    });
// Duru busenos nuskaitymas is firebase ir ju atvaizdavimas

// Duomenys is firebase
    this.db_door.on('value', snap =>{
        this.setState({
            status_door:snap.val() 
            
        });

    //Duomenu atvaizdavimas DOMe
    const door_open = document.getElementById('door_open');
    
    if(snap.val() === 1){
        door_open.style.backgroundColor = 'green'
        door_open.style.color = 'white'
        this.setState({
            status_door_txt: "Atidaryta",  
        })
        //Duru log irasymas i firebasa
        this.db_door_log.push({
            busena: this.state.status_door_txt,
            laikas: this.state.time})
        }
    else{
        door_open.style.backgroundColor = 'red';
        door_open.style.color = 'white'
        this.setState({
            status_door_txt: "Uzdaryta"
            
        })
        //Duru log irasymas i firebasa
        this.db_door_log.push({
            busena: this.state.status_door_txt,
            laikas: this.state.time})
    }
});
    //Duru log nuskaitymas is firebase
    this.db_door_log.orderByKey().limitToLast(3).on('value', snap =>{
        this.setState({
            door_count: snap.val()
        });
        console.log(this.state.door_count)
        })
        
    //Temperaturos nuskaitymas is firebase
    setInterval(()=>this.db_temp.on('value', snap=>{
        this.setState({
            temp: snap.val(),
        })
        const blink = document.getElementById("blinkText")
        if(this.state.temp > this.state.newTempValue_over ){
            
            this.db_temp_over.set({
                laikas: this.state.time,
                busena: this.state.temp + "C",
            })
        }
    }
    ), 5000)

    
    //Temperaturos virs 27 nuskaitymas
    
        this.db_temp_over.orderByKey().limitToLast(2).on('value', snap=>{
            this.setState({
                temp_over_27: snap.val()
            })
            console.log(snap.val())
        });
      
    //Dregmes nuskaitymas is firebase
    this.db_dregme.on('value', snap=>{
        this.setState({
            humidity: snap.val(),
        })
    }
    )
}

    //Reles ijungimas
    turnon = () => {
        this.db_relay.set(
            this.state.on
        );
    } 
     //Reles isjungimas
     turnoff = () => {
        this.db_relay.set(
            this.state.off
        ); 
    } 
    //Laikrodis
    clock(){
        this.setState({
            time: new Date().toLocaleString()
        })
    }
    //Nustatyti virsijama temp.
    handleChange(e){
            this.setState({
                valueTemp_over: e.target.value
            })
    }

    submitTemp_over(e){
        e.preventDefault();
        let valueTemp = this.state.valueTemp_over
        let newValueTemp = [...this.state.newTempValue_over, valueTemp]
        if(valueTemp.length <= 2){
        this.setState({
            newTempValue_over: newValueTemp,
            valueTemp_over: ""
        })
    }else{
        alert("Iveskite du skaicius")
    }
            
        }
        eraseTemp(e){
            e.preventDefault();
            this.setState({
                newTempValue_over: ""
            })
        }
    
    //Duomenys i temperaturos diagrama

    getChartData(){
        this.setState({
            chartData:{
                labels: [],
                datasets:[
                  {
                    label:"Kambario temp.",
                    data: [],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                    ]}
                ]
        }   
})
}
// Temperatura Y asyje
data() {
    const tempera = this.state.temp
    const datasetsCopy = this.state.chartData.datasets.slice(0);
    const dataCopy = datasetsCopy[0].data.slice(0);
    dataCopy[0] = tempera;
    datasetsCopy[0].data = dataCopy;
    this.setState({
        chartData: Object.assign({}, this.state.chartData, {
            datasets: datasetsCopy
        })
    });
}

//Laikas X asyje
labels() {
    const newLabels = [...this.state.chartData.labels, this.state.time]
    this.setState({
        chartData:{...this.state.chartData, labels: newLabels}
        })
}

    componentWillMount(){
        setInterval(()=>this.clock(), 500);
        this.getChartData();
        setInterval(() => this.data(),1000);
        setInterval(() => this.labels(),1000)
    

}

render() {


return (
    
<div className="switch_wall">
    <Header time={this.state.time} />
    <h1>Jungikliai</h1>
    <hr></hr>
    <div className="first">
        <h2>Pirmas jungiklis</h2>
            
            <h3 id="on">Sistemos busena: {this.state.status_switch_txt}</h3>
            
        <button type="submit" onClick={this.turnon}>Ijungti</button>
        <button type="submit" onClick={this.turnoff}>Isjungti</button>
    </div>
    <p></p>
    <hr></hr>
    <p></p>
    <div className="second">
    <h2>Antras jungiklis</h2>
        <h3 id="on">Sistemos busena:</h3>
        <button type="submit">Ijungti</button>
        <button type="submit">Isjungti</button>
        <p></p>
        <hr></hr>
    <h2>Temperatura {this.state.temp}C</h2>
    <h2>Dregme {this.state.humidity}%</h2>
    <div className="temp_over">
    <form>
            <label>
                <h2>Nustatyti virsijama temp.</h2>
                <input type="text"
                       className="setTemp_over" 
                       pattern="^-?[0-9]\d*\.?\d*$"
                       value ={this.state.valueTemp_over}
                       onChange={this.handleChange.bind(this)}
                 />
            </label>
            <button type ="submit" onClick={this.submitTemp_over.bind(this)}>Nustatyti</button>
            <button className="erase_temp" type ="submit" onClick={this.eraseTemp.bind(this)}>Istrinti is paneles</button>
        </form>
    <h2 >Nustatyta virsijama temp. <span className="setTemp">{this.state.newTempValue_over}</span>C 
    <div>Uzfiksuota virsijama Temp. ir laikas :</div> {Object.values(this.state.temp_over_27).map((temp, i)=>
        <div className="temp_over_map" key={i}><span id="blinkText">{temp}</span> </div>)}</h2>
    </div>

        
        <h1 id="door_open">Duru busena: {this.state.status_door_txt}</h1>
        <p></p>
        
        <h2>Duru atidarymo ir uzdarymo laikas</h2>
        <h2>{Object.values(this.state.door_count).map((door,i)=>
           <li key ={i}>{door.busena}, {door.laikas}</li> )}</h2>
</div>
    <hr></hr>
    <div className="temp_graph">
    <Temp_graph chartTemp={this.state.chartData}
    />
    
    </div>
</div>
    
);
}
}

export default Switch;