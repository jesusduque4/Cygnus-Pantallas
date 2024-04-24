import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ApirestService } from 'src/app/services/apirest.service';
import  {Chart, ChartConfiguration, ChartType } from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-cardsections',
  templateUrl: './cardsections.component.html',
  styleUrls: ['./cardsections.component.css']
})
export class CardsectionsComponent implements OnInit {
  @Input() title = '';
  @Input() resourcename = '';
  items: any = [];

  asistHP: any = ['','','']
  asistMS: any = ['','','']

  constructor(private apirest: ApirestService, private cdr: ChangeDetectorRef) {

    this.apirest.getAttendance().subscribe((data:any)=> {
      const clientes = ['HPE', 'MSFT']; // Puedes agregar más clientes si es necesario
      const turnos = ['1', '2', '3'];

      clientes.forEach(cliente => {
        turnos.forEach(turno => {
          const value = data.find((item: { turno: string; cliente: string; }) => item.turno === turno && item.cliente === cliente)?.value;
            if (cliente === 'HPE') {
              this.asistHP[parseInt(turno) - 1] = value;
            } else if (cliente === 'MSFT') {
              this.asistMS[parseInt(turno) - 1] = value;
            }
        });
      });



    });


  }

  ngOnInit(): void {
    if (this.resourcename === 'news' || this.resourcename === 'sports') {
      this.apirest.getGenericData(this.resourcename).subscribe((data: any) => {
        this.items = data;
        this.loadCarousel();
      });



      setTimeout(() => {
        this.createChart('barHP1', 'HP',   this.asistHP[0]);
        this.createChart('barMS1', 'MSFT', this.asistMS[0]);
        this.createChart('barHP2', 'HP',   this.asistHP[1]);
        this.createChart('barMS2', 'MSFT', this.asistMS[1]);
        this.createChart('barHP3', 'HP',   this.asistHP[2]);
        this.createChart('barMS3', 'MSFT', this.asistMS[2]);
      }, 1000);

    }

    setTimeout(() => {
      const carouselContainerNews = document.getElementById('carouselNoticias')!;
      const carouselContainerSports = document.getElementById('carouselDeportes')!;
      const scrollSpeed = 100;
      let shouldResetScrollTopNews = false;
      let shouldResetScrollTopSports = false;

      function scrollCarouselNews() {
        const carouselHeight = carouselContainerNews.scrollHeight;
        const currentScrollTop = carouselContainerNews.scrollTop;
        let newScrollTop;

        if (shouldResetScrollTopNews) {
          newScrollTop = 0; // Reiniciar al principio
          shouldResetScrollTopNews = false;
        } else {
          newScrollTop = currentScrollTop + 1;
        }

        if (newScrollTop >= carouselHeight) {
          shouldResetScrollTopNews = true;
        }

        carouselContainerNews.scrollTop = newScrollTop;
      }

      function scrollCarouselSports() {
        const carouselHeight = carouselContainerSports.scrollHeight;
        const currentScrollTop = carouselContainerSports.scrollTop;
        let newScrollTop;

        if (shouldResetScrollTopSports) {
          newScrollTop = 0; // Reiniciar al principio
          shouldResetScrollTopSports = false;
        } else {
          newScrollTop = currentScrollTop + 1;
        }

        if (newScrollTop >= carouselHeight) {
          shouldResetScrollTopSports = true;
        }

        carouselContainerSports.scrollTop = newScrollTop;
      }

      setInterval(() => {
        shouldResetScrollTopNews = true;
        shouldResetScrollTopSports = true;
      }, 5000);

      setInterval(scrollCarouselNews, scrollSpeed);
      setInterval(scrollCarouselSports, scrollSpeed);
    }, 800);
  }

  private loadCarousel() {
    if (this.resourcename.length > 0) {
      setTimeout(() => {
        try {
          var myCarousel = document.querySelector(`#carouselSlides_${this.resourcename}`);
          var carousel: any = null;
          eval(`carousel = new bootstrap.Carousel(myCarousel,{interval: 5000});`);
        } catch (e) {
        }
      }, 1000);
    }
  }



  private createChart(id: string, labels: string, dataValue: number) {

    const existingChart = Chart.getChart(id); // Obtener el gráfico existente si lo hay
    if (existingChart) {
      existingChart.destroy(); // Destruir el gráfico existente si existe
    }

    const barThickness = 20; // Valor base del grosor de la barra
    const data = {
      labels: [labels],
      datasets: [{
          borderRadius: Number.MAX_VALUE,
          barThickness: 20, // Grosor de la barra (ajústalo según tus necesidades)
          borderWidth: 0,
          borderSkipped: false, // Asegura que no se omitan los bordes
          data: [dataValue],
          backgroundColor: ['#2be33c'],
      }]
  };
  const maxHeight = 100; // Altura máxima del canvas cuando el valor es 100%

const config: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: data,
    options: {
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
        },
        scales: {
            x: {
                display: false,
                ticks: {
                    color: 'white',
                },
            },
            y: {
                display: false,
                min: 0,
                max: 100,
            },
        },
        layout: {
            padding: {
                top: 10
            }
        },
        responsive: true, // Permite que el gráfico sea responsive
        maintainAspectRatio: false, // Evita que el gráfico mantenga un aspect ratio predeterminado
        aspectRatio: 3, // Relación de aspecto del gráfico (ajusta según sea necesario)
        onResize: function(chart, size) { // Ajusta el tamaño del canvas al redimensionar
            const canvas = chart.canvas;
            canvas.style.height = maxHeight + 'px';
            canvas.style.width = 'auto';
        }
    },
};


    const ctx = document.getElementById(id) as HTMLCanvasElement | null;

    if (ctx) {
      return new Chart<'bar'>(ctx, config);
    }
    return null;
}



}
