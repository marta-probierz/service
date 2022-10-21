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
  tooltip;

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(value => {
      this.invoices = value.invoices;
    });

    this.tooltip = d3.select('figure')
        .append('div')
        .attr('class', 'tooltip')
        .style('display', 'none')
        .style('opacity', 0);

    this.createSvg1();
    this.createColors1();
    this.drawBars(this.invoices);

    this.createSvg2();
    this.createColors2();
    this.drawChart();
  }


  createColors1(): void {
    this.colors = d3.scaleOrdinal()
        .domain(this.invoices.map(d => d.amountDue.toString()))
        .range(['#588c7e', '#f2e394', '#f2ae72', '#d96459']);
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
        .padding(.15);

    this.svg.append('g')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-35)')
        .style('text-anchor', 'end');

    const y = d3.scaleLinear()
        .domain([0, 600])
        .range([this.height, 0]);

    this.svg.append('g')
        .call(d3.axisLeft(y)
            .ticks(12)
            .tickFormat(d3.format('$')));

    this.svg.selectAll('bars')
        .data(invoices)
        .enter()
        .append('rect')
        .attr('x', d => x(d.jobID))
        .attr('y', d => y(d.amountDue))
        .attr('width', x.bandwidth())
        .attr('height', (d) => this.height - y(d.amountDue))
        .attr('fill', (d, i) => (this.colors(i)))
        .attr('stroke', '#121926')
        .style('stroke-width', '.5px')
        .on('mouseover', function() {
          d3.select(this)
              .style('cursor', 'pointer')
              .style('opacity', .7);
        })
        .on('mouseleave', function() {
          d3.select(this)
              .style('opacity', 1);
        })
        .on('mousemove', function (s, d) {
          this.tooltip
              .style('left', ((<any>event).pageX) + 'px')
              .style('top', ((<any>event).pageY) - 210 + 'px')
              .style('display', 'block')
              .style('opacity', 1)
              .html(`<b style="color: #0068A8">$${d.amountDue}</b>`);
        }.bind(this))
        .on('mouseout', function () {
          this.tooltip
              .style('display', 'none')
              .style('opacity', 0);
        }.bind(this));
  }


  createSvg2(): void {
    this.svg = d3.select('figure#invoicesPie')
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .append('g')
        .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  createColors2(): void {
    this.colors = d3.scaleOrdinal()
        .domain(this.invoices.map(d => d.amountDue.toString()))
        .range(['#c2f3d4', '#80ced6', '#fefbd8', '#618685', '#deeaee', '#4040a1', '#b0aac0']);
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
        .style('stroke-width', '.3px')
        .on('mouseover', function() {
          d3.select(this)
              .style('cursor', 'pointer')
              .style('opacity', .7);
        })
        .on('mouseleave', function() {
          d3.select(this)
              .style('opacity', 1);
        })
        .on('mousemove', function (s, d) {
          this.tooltip
              .style('left', ((<any>event).pageX) + 'px')
              .style('top', ((<any>event).pageY) - 210 + 'px')
              .style('display', 'block')
              .style('opacity', 1)
              .html(`<b style="color: #373737">${d.data.jobID}</b>`);
        }.bind(this))
        .on('mouseout', function () {
          this.tooltip
              .style('display', 'none')
              .style('opacity', 0);
        }.bind(this));

    const labelLocation = d3.arc()
        .innerRadius(100)
        .outerRadius(this.radius + 220);

    this.svg
        .selectAll('pieces')
        .data(pie(this.invoices))
        .enter()
        .append('text')
        .text(d => `$${d.data.amountDue}`)
        .attr('transform', d => 'translate(' + labelLocation.centroid(d) + ')')
        .style('text-anchor', 'middle')
        .style('font-size', 9);
  }
}
