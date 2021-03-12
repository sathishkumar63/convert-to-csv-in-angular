import { Component } from "@angular/core";
import { AppService } from "./app.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private appService: AppService) {}

  jsonData = [
    {
      enrollmentId: "135345897211380",
      error: "Invalid Enrollment ID. Please revise and try again."
    },
    {
      enrollmentId: "142145932210585",
      error: "Invalid Enrollment ID. Please revise and try again."
    }
  ];

  download() {
    this.appService.downloadCSVFile(this.jsonData);
  }
}
