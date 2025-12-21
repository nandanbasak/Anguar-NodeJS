import { Component, OnInit } from "@angular/core";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-menuitems",
  templateUrl: "./menuitems.component.html",
  styleUrls: ["./menuitems.component.css"],
})
export class MenuitemsComponent implements OnInit {
  constructor(private commonservice: CommonService) {}
  menuItems: any=[];
  Items: any=[];
  ngOnInit() {
    this.commonservice.getMenuItems().subscribe((data) => {
      for(const d of (data as any)){
        this.Items.push({
          name: d.MENU_NAME,
          code: d.MENU_CODE
        });
      }
      console.log(this.Items);
      this.menuItems = data;
      console.log(`Menu Items : ${JSON.stringify(this.menuItems)}`)
    });
  }
}