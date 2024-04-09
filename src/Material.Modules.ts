import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";


@NgModule({
    exports:[
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule

    ]
})
export class MaterialModules{}