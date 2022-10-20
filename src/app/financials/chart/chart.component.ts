import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as d3 from 'd3';

import { Invoice } from '@app/transactions/Invoice';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit {
  invoices: Invoice[] = [];
  svg;
  margin = 50;
  width = 750;
  height = 650;
  radius = Math.min(this.width, this.height) / 2 - this.margin;
  colors;

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(value => {
      this.invoices = value.invoices;
    });
    this.createSvg1();
    this.drawBars(this.invoices);

    this.createSvg2();
    this.createColors();
    this.drawChart();
  }

  createSvg1(): void {
    this.svg = d3.select('figure#invoicesBar')
        .append('svg')
        .attr('width', this.width + (this.margin * 2))
        .attr('height', this.height + (this.margin * 5))
        .append('g')
        .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  drawBars(invoices): void {
    const x = d3.scaleBand()
        .range([0, this.width])
        .domain(this.invoices.map(d => d.jobID))
        .padding(0.15);


    this.svg.append('g')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-35)')
        .style('text-anchor', 'end');


    const y = d3.scaleLinear()
        .domain([0, 800])
        .range([this.height, 0]);


    this.svg.append('g')
        .call(d3.axisLeft(y));


    this.svg.selectAll('bars')
        .data(invoices)
        .enter()
        .append('rect')
        .attr('x', d => x(d.jobID))
        .attr('y', d => y(d.amountDue))
        .attr('width', x.bandwidth())
        .attr('height', (d) => this.height - y(d.amountDue))
        .attr('fill', '#0068A8');
  }



  createSvg2(): void {
    this.svg = d3.select('figure#invoicesPie')
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .append('g')
        .attr(
            'transform',
            'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
        );
  }

  createColors(): void {
    this.colors = d3.scaleOrdinal()
        .domain(this.invoices.map(d => d.amountDue.toString()))
        .range(['#c7d3ec', '#a5b8db', '#879cc4', '#677795', '#5a6782']);
  }
  drawChart(): void {
    const pie = d3.pie<any>().value((d: any) => Number(d.amountDue));


    this.svg
        .selectAll('pieces')
        .data(pie(this.invoices))
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(this.radius)
        )
        .attr('fill', (d, i) => (this.colors(i)))
        .attr('stroke', '#121926')
        .style('stroke-width', '1px');


    const labelLocation = d3.arc()
        .innerRadius(100)
        .outerRadius(this.radius + 210);

    this.svg
        .selectAll('pieces')
        .data(pie(this.invoices))
        .enter()
        .append('text')
        .text(d => d.data.amountDue)
        .attr('transform', d => 'translate(' + labelLocation.centroid(d) + ')')
        .style('text-anchor', 'middle')
        .style('font-size', 10);
  }
}
