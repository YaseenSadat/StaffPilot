// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { MaterialModule } from './app/shared/material.module';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(FormsModule, MaterialModule)
  ]
}).catch(err => console.error(err));
