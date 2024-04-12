import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatBadgeModule} from "@angular/material/badge";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatSliderModule } from "@angular/material/slider";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input"

@NgModule({
    exports:[
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatBadgeModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatSliderModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule, 
    ]
})
export class MaterialModules{}