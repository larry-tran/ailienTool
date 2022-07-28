import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertImageToTextComponent } from './convert-image-to-text/convert-image-to-text.component';

const routes: Routes = [
  {
    path: '',
    component: ConvertImageToTextComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
