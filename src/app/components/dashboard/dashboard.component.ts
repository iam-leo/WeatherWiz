import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  ciudad = '';
  loading = false;
  suscripcion: any;
  existeCiudad = false;
  errorBusqueda = false;
  temperatura = 0;
  temperaturaMax = 0;
  temperaturaMin = 0;
  humedad = 0;
  descripcion = ''
  iconMain = ''
  
  sunrise = {
    hora: 0,
    minutos: 0
  }
  
  sunset = {
    hora: 0,
    minutos: 0
  }

  constructor(private _climaService: ClimaService){ }

  ngOnInit(): void { }

  obtenerClima(){
    //Mostrar loading
    this.loading = true;

    //Iniciar suscripcion
    this.suscripcion = this._climaService.getClima(this.ciudad).subscribe({
      next: (data: any) => {
        //Ocultar loading y mostrar card con info
        setTimeout(() => {
          this.loading = false;        
          this.existeCiudad = true;
        }, 2000);
        
        //Extraer los datos del response
        this.temperatura = data.main.temp - 273.15
        this.temperaturaMax = data.main.temp_max - 273.15
        this.temperaturaMin = data.main.temp_min - 273.15
        this.humedad = data.main.humidity
        this.descripcion = data.weather[0].description
        this.iconMain = `../../../assets/img/${data.weather[0].icon}.svg`
  
        //Obtener el timestamp del sunrise y sunset
        const timeSunrise = new Date(data.sys.sunrise * 1000);
        const timeSunset = new Date(data.sys.sunset * 1000);
  
        //Pasarlos al obj correspondiente
        this.sunrise.hora = timeSunrise.getHours();
        this.sunrise.minutos = timeSunrise.getMinutes();
        this.sunset.hora = timeSunset.getHours();
        this.sunset.minutos = timeSunset.getMinutes();
      },

      error: error => {
        setTimeout(() => {
          //Ocultar loading y card info
          this.loading = false;
          this.existeCiudad = false;
          
          //Mostrar error
          this.errorBusqueda = true;
          setTimeout(() => {
            this.errorBusqueda = false;
            this.ciudad = ''
          }, 3000);
        }, 2000);
      },
    });
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }
}
