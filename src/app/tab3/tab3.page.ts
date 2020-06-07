import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { WebsocketService } from "../services/websocket.service";
import { Storage } from "@ionic/storage";
import { HttpgetService } from "../services/httpget.service";
import { CamConfig } from "../interfaces/CamConfig";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  streamingButtonLabel:string = "Start Stream";
  carIp: string;
  camIp: string;
  camConfig:CamConfig = {
    framesize: 5,
    quality: 10,
    brightness:0,
    contrast:0,
    saturation:0,
    specialEffect:0,
    awb:true,
    awbGain:true,
    wbMode:0,
    aecSensor:true,
    aecDsp:true,
    aeLevel:0,
    aecValue:204,
    agc:true,
    agcGain:5,
    gainceiling:0,
    bpc:false,
    wpc:true,
    rawGma:true,
    lenc:true,
    hmirror:true,
    vflip:true,
    dcw:true,
    colorbar:false,
    faceDetect:false,
    faceRecognize:false,
    flashOn:false,
  };

  frameSizes = [
    { value: 10, description: "UXGA(1600x1200)" },
    { value: 9, description: "SXGA(1280x1024)" },
    { value: 8, description: "XGA(1024x768)" },
    { value: 7, description: "SVGA(800x600)" },
    { value: 6, description: "VGA(640x480)" },
    { value: 5, description: "CIF(400x296)" },
    { value: 4, description: "QVGA(320x240)" },
    { value: 3, description: "HQVGA(240x176)" },
    { value: 0, description: "QQVGA(160x120)" },
  ];
  specialEffects = [
    { value : 0, description:"No Effect"},
    { value : 1, description:"Negative"},
    { value : 2, description:"Grayscale"},
    { value : 3, description:"Red Tint"},
    { value : 4, description:"Green Tint"},
    { value : 5, description:"Blue Tint"},
    { value : 6, description:"Sepia"},
  ];
  wbModes = [
    { value : 0, description:"Auto"},
    { value : 1, description:"Sunny"},
    { value : 2, description:"Cloudy"},
    { value : 3, description:"Office"},
    { value : 4, description:"Home"},
  ];
  constructor(
    private storage: Storage,
    private router: Router,
    private httpGet: HttpgetService,
    private wsService: WebsocketService
  ) {}

  customActionSheetOptions: any = {
    header: "Resolution",
    subHeader: "Select your resolution",
  };

  setStorage() {
    this.storage.set('camConfig', this.camConfig);
  }

  //每次進入這頁時檢查
  ionViewDidEnter() {
    this.storage.get("carip").then((data: any) => {
      if (data == null) {
        this.router.navigate(["/tabs/config"]);
      } else {
        this.carIp = data;
        this.httpGet
          .getText("http://" + this.carIp + "/getcamip")
          .subscribe((data: any[]) => {
            console.log(data);
            if(data)
              this.camIp = data.toString();
              //todo get esp32-cam status
          });
      }
    });
  }
  
  updateValue(name:string,id:string){
    console.log("updateValue:"+name);
    let myQuery = "http://";
    myQuery += this.camIp;
    myQuery += "/control?var=";
    myQuery += id;
    myQuery += "&val=";
    myQuery += this.camConfig[name];
    this.httpGet.getText(myQuery)
      .subscribe((data: any[]) => {
        console.log(data);
      });
      this.setStorage();
  }

  updateBoolean(name:string,id:string) {    
    console.log("updateBoolean:"+name);
    let myQuery = "http://";
    myQuery += this.camIp;
    myQuery += "/control?var=";
    myQuery += id;
    myQuery += "&val=";
    myQuery += this.camConfig[name]?"1":"0";
    this.httpGet
      .getText(myQuery)
      .subscribe((data: any[]) => {
        console.log(data);
      });
    this.setStorage();
  }
  
    enrollFace(){

    }
}
