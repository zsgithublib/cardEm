import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
// import * as moment from 'moment';

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
    if(age < 18) {
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
       // Success! Barcode data is here
      }, (err) => {
          // An error occurred
      });
  }

}
