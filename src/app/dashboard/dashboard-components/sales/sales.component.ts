import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent, ApexChart, ApexDataLabels, ApexPlotOptions, ApexLegend, ApexStroke, ApexTooltip, ApexAxisChartSeries, ApexFill, ApexXAxis, ApexGrid, ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';
import { GenericService } from '../../../services/generic.service'; // Asegúrate de importar tu servicio correctamente

export interface ChartOptions {
  series: ApexAxisChartSeries;
  dataLabels: ApexDataLabels;
  chart: ApexChart;
  legend: ApexLegend;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
}

export interface PieChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  tooltip: ApexTooltip;
  responsive: ApexResponsive[];
}



@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {


  @ViewChild("activeusercardchart") chart1: ChartComponent = Object.create(null);
  @ViewChild("pieChart") pieChart: ChartComponent = Object.create(null);
  public activeusercardChartOptions!: Partial<ChartOptions>;
  public pieChartOptions!: Partial<PieChartOptions>; // Usar la interfaz PieChartOptions

  public eventDetails: any[] = []; // Añadido para almacenar los detalles de eventos

  public selectedEvent: any;

  constructor(private eventService: GenericService) { }

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.eventService.getEventAttendanceStatistics().subscribe(response => {
      const events = response.data;

      // Mostrar los datos en la consola
      console.log(events);

      // Configurar las opciones del gráfico de pastel
   
      // Configurar las opciones del gráfico de barras
      this.activeusercardChartOptions = {
        series: [
          {
            name: 'Asistencias confirmadas',
            data: events.map(event => event.totalAttendance),
            color: '#eaa159' 
          },
          {
            name: 'Asistencias NO confirmadas',
            data: events.map(event => event.totalNoAttendence),
            color: '#07305d' 
          }
        ],
        xaxis: {
          categories: events.map(event => event.eventName),
        },
        chart: {
          toolbar: {
            show: false,
          },
          type: 'bar',
          height: 300,
        },
        legend: {
          show: true,
        },
        tooltip: {
          theme: "dark",
          y: {
            formatter: (val: number) => `${val} people`
          }
        },
        grid: {
          show: false,
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['none']
        },
        plotOptions: {
          bar: {
            columnWidth: '45%',
            borderRadius: 6,
          },
        },
      };
         // Configurar las opciones del gráfico de pastel con el primer evento por defecto
         if (events.length > 0) {
          this.selectEvent(events[0]);
        }
        
        // Actualizar los detalles de eventos para mostrar en el HTML
        this.eventDetails = events;
      }, error => {
        console.error('Error fetching event attendance statistics:', error);
      });
    }
  
    selectEvent(event: any): void {
      this.selectedEvent = event;
      this.pieChartOptions = {
        series: [event.averageAttendancePercentage, event.nonAttendancePercentage], // Porcentaje de asistencia y no asistencia
        chart: {
          type: 'pie',
          height: 300
        },
        labels: [`Asisten (${event.averageAttendancePercentage}%)`, `No asisten (${event.nonAttendancePercentage}%)`],
        colors: ['#eaa159', '#07305d'], // Colores personalizados para el gráfico de pastel
        legend: {
          show: true
        },
        tooltip: {
          theme: 'dark',
          y: {
            formatter: (val: number) => `${val}%`
          }
        },
        responsive: [{ // Asegúrate de incluir la propiedad responsive si es necesaria
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };
    }
  }