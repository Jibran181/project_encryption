import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConnectionComponent } from "./connection/connection.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./guards/auth.guard";
import { RecieverComponent } from "./reciever/reciever.component";
import { SignatureComponent } from "./signature/signature.component";
const routes: Routes = [
  {
    path: "",
    component: ConnectionComponent,
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "reciever",
    component: RecieverComponent,
  },
  {
    path: "signature",
    component: SignatureComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
