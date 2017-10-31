import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth"
import { LoginPage } from '../login/login'
import { AngularFireDatabase } from "angularfire2/database";
import firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  // @ViewChild('map') mapElement:ElementRef;
  nani;
  map: any;
  public toggleStatus: boolean;
  constructor(private afAuth : AngularFireAuth,
    public navCtrl: NavController,
    private geolocation: Geolocation,
    public db: AngularFireDatabase) {
      this.toggleStatus=false;
      let database=firebase.database();
      db.object('nani').valueChanges().subscribe(data => {
        this.nani= data;
   });
  }
  
  logout(){
  this.afAuth.auth.signOut()  
  this.navCtrl.setRoot(LoginPage) 
  }
  naniPosition;
  
  ionViewWillLoad(){
  
  }
  // initMap() {
  //   let x = this;
  //   this.geolocation.getCurrentPosition().then((position) => {
  //     x.naniPosition = {lat: position.coords.latitude, lng: position.coords.longitude}
  //     let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //     this.map = new google.maps.Map(document.getElementById('map'), {
  //       zoom: 15,
  //       center: location,
  //       mapTypeId: 'terrain'
  //     });
  //   })
  // }  
trackNani(){
  console.log("initial toggle state", this.toggleStatus ) 
  // var db = firebase.database();    
  // db.ref("nani/YdSV2gxkYoO84TtnOoOjBauEJB33").update({ ava}); 
  if(this.toggleStatus === true){        
        let naniesFix=this.nani;
        var Nnani = this.afAuth.auth.currentUser; 
        var db = firebase.database();    
        db.ref("nani/"+Nnani.uid).update({ available : true});
    let that = this
      var intervalFunc = setInterval(function timer() {
          that.geolocation.getCurrentPosition().then(position => {
            let location = new google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );
            let naniLat = position.coords.latitude;
            let nanilng = position.coords.longitude;
              console.log("hereeeee",naniLat,nanilng,Nnani.uid)
              var db = firebase.database();    
              db.ref("nani/"+Nnani.uid).update({ lat: naniLat, lng:nanilng});
              console.log("vvvvvv",Nnani.uid,naniLat,nanilng)
              
          })
      
        }, 1000); 

  }else{
    console.log("inside false")
    clearInterval(intervalFunc)
    var Nnani = this.afAuth.auth.currentUser;     
    var db = firebase.database();    
    db.ref("nani/"+Nnani.uid).update({ available : false});
  }

}
    
 

}



 
 

   

   