import { Component, OnInit, Input } from '@angular/core';
import { ApirestService } from 'src/app/services/apirest.service';
import 'chartjs-plugin-datalabels';
import  {Chart, ChartConfiguration, ChartType } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { fpyGraph, fpyGraph2, fpyGraph3, otherGraph, otherGraph2 } from '../../shared';


@Component({
  selector: 'fpy-graphs',
  templateUrl: './fpyGraphs.component.html',
  styleUrls: ['./fpyGraphs.component.css']
})
export class FpyGraphsComponent implements OnInit {
  @Input() id?: string = '';
  @Input() id2?: string = '';
  @Input() type?: string = '';


  constructor(private apiservice: ApirestService){

  }

  ngOnInit(): void {

      const fpyGraphs:any = {
        'FPY ASSEMBLY PPS': fpyGraph,
        'FPY RUN-IN PPS': fpyGraph,
        'FPY TEST PPS': fpyGraph2,
        'FPY TEST SERVERS': fpyGraph2,
        'FPY ASSEMBLY SERVERS': fpyGraph3,
        'FPY RUN-IN SERVERS': fpyGraph3,
      };

      const otherGraphs:any = {
        'Todays Assembly Commit': otherGraph,
        'Todays Shipment Commit': otherGraph,
        'Shipment Summary (Yesterday)': otherGraph2,
        'Assembly Summary (Yesterday)': otherGraph2
      };

      this.apiservice.getGraphData('FPY_ASSEMBLY').subscribe((data: any) => {
        data.forEach((element: any) => {
          const reportName = element.ReportName;
          debugger;
          if (fpyGraphs[reportName]){
            const graph = fpyGraphs[reportName];
            if (graph) {
              if (element.ReportName.includes('FPY ASSEMBLY PPS') || element.ReportName.includes('FPY TEST PPS') ||
                 element.ReportName.includes('FPY ASSEMBLY SERVERS')) {
                this.updateFpyGraph(graph, element.Category, element.MeasureLabel, element.Measure, element.Title);
              } else {
                this.updateFpyGraph2(graph, element.Category, element.MeasureLabel, element.Measure, element.Title);
              }
            }
          } else {
            const graph = otherGraphs[reportName];
            if (graph) {
              if (element.ReportName.includes('Todays Assembly Commit') || element.ReportName.includes('Shipment Summary (Yesterday)') )  {
                this.updateOtherGraph(graph, element.Category, element.MeasureLabel, element.Measure, element.Title, element.reportName);
              } else {
                this.updateOtherGraph2(graph, element.Category, element.MeasureLabel, element.Measure, element.Title, element.reportName);
              }
            }
          }
        });
      });

      setTimeout(() => {
        // this.createChart('FPY_ASSEMBLY_PPS', 'CURRENT WEEK',  this.fpyAssemblyCurrentGraph.measure);
        this.createFpyChart(fpyGraph.id, fpyGraph.name, fpyGraph.goal, fpyGraph.fpy, ['CURRENT WEEK', 'LAST WEEK'], ['#3498db','#2ecc71'], ['#2980b9','#27ae60'], [fpyGraph.currentMeasure, fpyGraph.lastMeasure]);
        this.createFpyChart(fpyGraph.id2, fpyGraph.name2, fpyGraph.goal2, fpyGraph.fpy2, ['CURRENT WEEK', 'LAST WEEK'], ['#3498db','#2ecc71'], ['#2980b9','#27ae60'], [fpyGraph.currentMeasure2, fpyGraph.lastMeasure2]);

        this.createFpyChart(fpyGraph2.id, fpyGraph2.name, fpyGraph2.goal, fpyGraph2.fpy, ['CURRENT WEEK', 'LAST WEEK'], ['#3498db','#2ecc71'], ['#2980b9','#27ae60'], [fpyGraph2.currentMeasure, fpyGraph2.lastMeasure]);
        this.createFpyChart(fpyGraph2.id2, fpyGraph2.name2, fpyGraph2.goal2, fpyGraph2.fpy2, ['CURRENT WEEK', 'LAST WEEK'], ['#3498db','#2ecc71'], ['#2980b9','#27ae60'], [fpyGraph2.currentMeasure2, fpyGraph2.lastMeasure2]);

        this.createFpyChart(fpyGraph3.id, fpyGraph3.name, fpyGraph3.goal, fpyGraph3.fpy, ['CURRENT WEEK', 'LAST WEEK'], ['#3498db','#2ecc71'], ['#2980b9','#27ae60'], [fpyGraph3.currentMeasure, fpyGraph3.lastMeasure]);
        this.createFpyChart(fpyGraph3.id2, fpyGraph3.name2, fpyGraph3.goal2, fpyGraph3.fpy2, ['CURRENT WEEK', 'LAST WEEK'], ['#3498db','#2ecc71'], ['#2980b9','#27ae60'], [fpyGraph3.currentMeasure2, fpyGraph3.lastMeasure2]);

        this.createOtherChart(otherGraph.id, otherGraph.name,  ['PPS', 'SERVERS','RACKS'], ['ACTUAL','COMMIT'],['#ffa424','#2597f4'], [[otherGraph.ppsActual, otherGraph.ppsCommit],[otherGraph.serversActual, otherGraph.serversCommit],
        [otherGraph.racksActual, otherGraph.racksCommit]]);
        this.createOtherChart(otherGraph.id2, otherGraph.name2,  ['PPS', 'SERVERS','RACKS'], ['ACTUAL','COMMIT'],['#ffa424','#2597f4'], [[otherGraph.pps2Actual, otherGraph.pps2Commit],[otherGraph.servers2Actual, otherGraph.servers2Commit],
        [otherGraph.racks2Actual, otherGraph.racks2Commit]]);

        this.createOtherChart(otherGraph2.id, otherGraph2.name,  ['PPS', 'SERVERS','RACKS'], ['SHIPPED','PLANNED'], ['#ffa424','#2597f4'], [[otherGraph2.ppsActual, otherGraph2.ppsCommit],[otherGraph2.serversActual, otherGraph2.serversCommit],
        [otherGraph2.racksActual, otherGraph2.racksCommit]]);
        this.createOtherChart(otherGraph2.id2, otherGraph2.name2,  ['PPS', 'SERVERS','RACKS'], ['ASSEMBLED','PLANNED'], ['#ffa424','#2597f4'], [[otherGraph2.pps2Actual, otherGraph2.pps2Commit],[otherGraph2.servers2Actual, otherGraph2.servers2Commit],
        [otherGraph2.racks2Actual, otherGraph2.racks2Commit]]);

       }, 1000);

  }

  updateFpyGraph = (graph:any, category:string, measureLabel:string, measure: string, title: string) => {
    if (category === 'CURRENT WEEK') {
      graph.name = title;
      if (measureLabel === 'VOLUME') graph.currentMeasure = measure;
      if (measureLabel === 'FPY') graph.fpy = measure;
      if (measureLabel.slice(0, 4) === 'GOAL') graph.goal = measureLabel;
    } else if (category === 'LAST WEEK') {
      if (measureLabel === 'VOLUME') graph.lastMeasure = measure;
    }
  };

  updateFpyGraph2 = (graph:any, category:string, measureLabel:string, measure:string, title:string) => {
    if (category === 'CURRENT WEEK') {
      graph.name2 = title;
      if (measureLabel === 'VOLUME') graph.currentMeasure2 = measure;
      if (measureLabel.slice(0, 4) === 'GOAL') graph.goal2 = measureLabel;
      if (measureLabel === 'FPY') graph.fpy2 = measure;
    } else if (category === 'LAST WEEK') {
      if (measureLabel === 'VOLUME') graph.lastMeasure2 = measure;
    }
  };


updateOtherGraph = (graph:any, category:string, measureLabel:string, measure: string, title: string, reportName: string) => {
    debugger;
      if (category === 'PPS') {
        graph.name = title;
        if (measureLabel === 'ACTUAL' || measureLabel === 'SHIPPED') graph.ppsActual = measure;
        if (measureLabel === 'COMMIT' || measureLabel === 'PLANNED') graph.ppsCommit = measure;
      }
      if (category === 'SERVERS') {
        if (measureLabel === 'ACTUAL' || measureLabel === 'SHIPPED') graph.serversActual = measure;
        if (measureLabel === 'COMMIT' || measureLabel === 'PLANNED') graph.serversCommit = measure;
      }
      if (category === 'RACKS') {
        if (measureLabel === 'ACTUAL' || measureLabel === 'SHIPPED') graph.racksActual = measure;
        if (measureLabel === 'COMMIT' || measureLabel === 'PLANNED') graph.racksCommit = measure;
      }
  };

  updateOtherGraph2 = (graph:any, category:string, measureLabel:string, measure:string, title:string, reportName: string) => {
    if (category === 'PPS') {
      graph.name2 = title;
      if (measureLabel === 'ACTUAL' ||  measureLabel === 'ASSEMBLED') graph.pps2Actual = measure;
      if (measureLabel === 'COMMIT' || measureLabel === 'PLANNED') graph.pps2Commit = measure;
    }
    if (category === 'SERVERS') {
      if (measureLabel === 'ACTUAL' ||  measureLabel === 'ASSEMBLED') graph.servers2Actual = measure;
      if (measureLabel === 'COMMIT' || measureLabel === 'PLANNED') graph.servers2Commit = measure;
    }
    if (category === 'RACKS') {
      if (measureLabel === 'ACTUAL' ||  measureLabel === 'ASSEMBLED') graph.racks2Actual = measure;
      if (measureLabel === 'COMMIT' || measureLabel === 'PLANNED') graph.racks2Commit = measure;
    }
  };


  private createFpyChart(id: string, name:string, goal: string, fpy: string, labels: string[], color: string[], bordesColor: string[] ,dataValues: number[]) {
    const maxHeight = '1000';

    const existingChart = Chart.getChart(id); // Obtener el gráfico existente si lo hay
    if (existingChart) {
        existingChart.destroy(); // Destruir el gráfico existente si existe
    }

    const data = {
      labels: labels,
      datasets: [
        {
          barPercentage: 0.4, // Ajusta el porcentaje del ancho de la barra (40%)
          borderWidth: 2,
          borderSkipped: false, // Asegura que no se omitan los bordes
          data: dataValues, // Pasar los valores directamente
          backgroundColor: color,
          borderColor: bordesColor,
          label: goal
        },
        {
          barPercentage: 0.4,
          borderWidth: 0,
          borderSkipped: true,
          data: dataValues.map(() => 0), // Coloca ceros para no mostrar las barras
          backgroundColor: 'red',
          label: fpy+'%',
          hidden: true
        }
      ]
    };

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: data,
      options: {
        plugins: {
          tooltip: {
            enabled: true,
            position: 'nearest'
          },
          title: {
            display: true,
            text: name,
            color: 'white',
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          datalabels: {
            anchor: 'center',
            align: 'center',
            color: 'white',
            font: {
              weight: 'bold'
            },
            formatter: (value, context) => {
              return value;
            }
          },
          legend: {
            labels: {
              color: 'white',
              // Agrega esta función para personalizar la apariencia de los labels
              generateLabels: (chart) => {
                const original = Chart.defaults.plugins.legend.labels.generateLabels;
                const labelsOriginal = original.call(this, chart);

                labelsOriginal.forEach(label => {
                  if (!chart.isDatasetVisible(label.datasetIndex!)) {
                    label.hidden = false;
                    label.strokeStyle = 'transparent';
                  }
                });

                return labelsOriginal;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.5)'
            },
            ticks: {
              color: 'white',
              font: {
                weight: 'bold'
              }
            }
          },
          x: {
            ticks: {
              color: 'white',
              font: {
                weight: 'bold'
              }
            }
          }
        },
        responsive: true,
        onResize: function (chart, size) {
          const canvas = chart.canvas;
          canvas.style.height = maxHeight + 'px';
          canvas.style.width = 'auto';
        }
      },
      plugins: [ChartDataLabels]
    };


    const ctx = document.getElementById(id) as HTMLCanvasElement | null;

    if (ctx) {
        return new Chart<'bar'>(ctx, config);
    }
    return null;
}

private createOtherChart(id: string, name:string, labels: string[], legends: string[],colors: string[], dataValues: number[][]) {

  const existingChart = Chart.getChart(id);
  if (existingChart) {
      existingChart.destroy();
  }

  const maxHeight = '1000';
  const actualData = dataValues.map(values => values[0]);
  const commitData = dataValues.map(values => values[1]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: legends[0],
        barPercentage: 1.0,
        borderWidth: 2,
        borderSkipped: false,
        data: actualData,
        backgroundColor: colors[0]
      },
      {
        label: legends[1],
        barPercentage: 1.0,
        borderWidth: 2,
        borderSkipped: false,
        data: commitData,
        backgroundColor: colors[1]
      }
    ]
  };

  const config: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: data,
    options: {
      indexAxis: 'y',
      plugins: {
        tooltip: {
          enabled: true,
          position: 'nearest'
        },
        title: {
          display: true,
          text: name,
          color: 'white',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        datalabels: {
          anchor: 'center',
          align: 'center',
          color: 'white',
          font: {
            weight: 'bold'
          }
        },
        legend: {
          labels: {
            color: 'white'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.5)'
          },
          ticks: {
            color: 'white',
            font: {
              weight: 'bold'
            }
          }
        },
        x: {
          ticks: {
            color: 'white',
            font: {
              weight: 'bold'
            }
          }
        }
      },
      responsive: true,
      onResize: function (chart, size) {
        const canvas = chart.canvas;
        canvas.style.height = maxHeight + 'px';
        canvas.style.width = 'auto';
      }
    },
    plugins: [ChartDataLabels]
  };

  const ctx = document.getElementById(id) as HTMLCanvasElement | null;

  if (ctx) {
    return new Chart<'bar'>(ctx, config);
  }
  return null;
}

}

