import { Routes } from '@angular/router';
import { TutorialsComponent } from './components/external/tutorials/tutorials.component';
import { IndexComponent } from './components/main/index/index.component';

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'tutorials', component: TutorialsComponent },
];
