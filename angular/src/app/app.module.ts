import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule, // <- IMPORTANT
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}