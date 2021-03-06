import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./modules/welcome/welcome.module').then(module => module.WelcomeModule)
    },
    {
        path: 'songs',
        loadChildren: () => import('./modules/songs/songs.module').then(module => module.SongsModule)
    },
    {
        path: 'bands',
        loadChildren: () => import('./modules/bands/bands.module').then(module => module.BandsModule)
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }