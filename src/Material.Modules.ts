import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule} from "@angular/material/autocomplete"
import {  MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input"

@NgModule({
    exports:[
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ]
})
export class MaterailModules{}