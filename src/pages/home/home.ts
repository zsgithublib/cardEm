import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public scannedText: any;
  public dob: any = '';
  public formattedDob: any = '';
  public age: any = '';
  public checkit: any = '';
  public name: any = '';
  public height: any = '';
  public ageToCheck = '21';
  public ages: any = ['18', '21']

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner) {
    this.name = '';
  }

  check(age: any) {
    if(age < this.age) {
      this.checkit = "Not old enough";
    } else {
      this.checkit = "Old enough";
    }
  }

  scanCard(){
      this.barcodeScanner.scan(
        {
          "preferFrontCamera" : false, // iOS and Android
          "showFlipCameraButton" : true, // iOS and Android
          "showTorchButton" : true, // iOS and Android
          "disableAnimations" : true, // iOS
          "prompt" : "Place the exhibit code inside the scan area", // supported on Android only
          "formats" : "PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          "orientation" : "portrait" // Android only (portrait|landscape), default unset so it rotates with the device
        }
      ).then((barcodeData) => {
        console.log(barcodeData.text);
  	    console.log('stringified:');
  	    console.log(JSON.stringify(barcodeData.text));
  	    console.log(JSON.stringify(barcodeData));
  	    this.scannedText = barcodeData.text;
  	    this.scannedText = this.scannedText.split("\n");
  	  	this.dob = this.scannedText[13].slice(3);
  	  	this.name = this.scannedText[2].slice(3);
  	  	this.height = this.scannedText[10].slice(3);
  	  	this.formattedDob = moment(this.dob,"YYYY-MM-DD").format();
  	  	this.age = moment().diff(this.formattedDob, 'years', true);
  	  	this.check(this.age);
       // Success! Barcode data is here
      }, (err) => {
          // An error occurred
      });
  }

  reset(){
    this.name = '';
  }

}
