import { DateHelper } from "./DateHelper.js";
export class DateNumberChartControl {
    constructor(element) {
        this.viewBoxWidth = 600;
        this.viewBoxHeight = 400;
        this.chartMarginTop = 2;
        this.chartMarginBottom = 2;
        this.chartMarginLeft = 3;
        this.chartMarginRight = 3;
        this.chartDomPoints = [];
        this.values = [];
        this.isMouseAbove = false;
        this.baseDiv = element;
        this.svg = this.baseDiv.querySelector('svg');
        this.infoDiv = this.baseDiv.querySelector('.chart-info');
        this.infoDotDiv = this.baseDiv.querySelector('.chart-info-dot');
        this.columnInfoDiv = this.baseDiv.querySelector('.chart-column-info');
        this.rowInfoDiv = this.baseDiv.querySelector('.chart-row-info');
    }
    get info_values_difference() {
        return parseFloat(this.baseDiv.getAttribute('data-info-values-difference') || '1.0');
    }
    initialize() {
        this.svg.setAttribute('viewBox', `0 0 ${this.viewBoxWidth} ${this.viewBoxHeight}`);
        this.svg.addEventListener('mouseenter', () => this.mouseEnter());
        this.svg.addEventListener('mouseleave', () => this.mouseLeave());
        this.svg.addEventListener('mousemove', e => this.mouseMove(e));
        this.infoDiv.classList.add('hidden');
        this.infoDotDiv.classList.add('hidden');
    }
    update(values) {
        this.values = values;
        this.redraw();
    }
    redraw() {
        this.svg.querySelectorAll('*').forEach(n => n.remove());
        this.columnInfoDiv.querySelectorAll('*').forEach(n => n.remove());
        this.rowInfoDiv.querySelectorAll('*').forEach(n => n.remove());
        this.chartDomPoints = [];
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        const totalDaysCount = this.getTotalDaysCount(this.values[0].date, this.values[this.values.length - 1].date);
        const datesToDraw = this.getDatesOfNthDay(this.values[this.values.length - 1].date, totalDaysCount);
        const dayOffsetX = (this.viewBoxWidth - this.chartMarginLeft - this.chartMarginRight) /
            (this.getTotalDaysCount(datesToDraw[0], datesToDraw[datesToDraw.length - 1]));
        let minValue = this.values[0].value;
        let maxValue = this.values[0].value;
        for (const pair of this.values) {
            if (pair.value < minValue)
                minValue = pair.value;
            if (pair.value > maxValue)
                maxValue = pair.value;
        }
        minValue = Math.floor(minValue / this.info_values_difference) * this.info_values_difference;
        maxValue = Math.ceil(maxValue / this.info_values_difference) * this.info_values_difference;
        for (const pair of this.values) {
            const point = this.svg.createSVGPoint();
            const numberOfDays = this.getTotalDaysCount(datesToDraw[0], pair.date);
            const relativePosY = 1 - ((pair.value - minValue) / (maxValue - minValue));
            point.x = numberOfDays * dayOffsetX + this.chartMarginLeft;
            point.y = (this.viewBoxHeight - this.chartMarginTop - this.chartMarginBottom) * relativePosY + this.chartMarginTop;
            polyline.points.appendItem(point);
            this.chartDomPoints.push({ value: pair, point: point });
        }
        polyline.setAttribute('shape-rendering', 'geometricPrecision');
        this.svg.append(polyline);
        for (let i = maxValue; i >= minValue; i -= this.info_values_difference) {
            const span = document.createElement('span');
            span.innerHTML = i.toFixed(2);
            this.rowInfoDiv.appendChild(span);
        }
        for (const date of datesToDraw) {
            const span = document.createElement('span');
            const splittedDate = date.toDateString().toUpperCase().split(' ');
            span.innerHTML = `${splittedDate[1]} ${splittedDate[3].toString().substring(2)}`;
            this.columnInfoDiv.appendChild(span);
        }
    }
    onCurrentPointChanged(value) {
    }
    mouseMove(e) {
        const offsetPxX = e.offsetX + (this.baseDiv.clientWidth - this.svg.clientWidth);
        const offsetRelativeX = e.offsetX / this.svg.clientWidth;
        const offsetViewBoxX = offsetRelativeX * this.viewBoxWidth;
        // TODO: Optimize
        const pointValue = this.findPoint(offsetViewBoxX);
        const offsetPxY = (pointValue.point.y / this.viewBoxHeight) * this.svg.clientHeight;
        this.infoDiv.style.setProperty('left', `${offsetPxX - (this.infoDiv.clientWidth / 2)}px`);
        if (!this.currentPointValue || this.currentPointValue !== pointValue) {
            this.infoDiv.style.setProperty('top', `calc(${offsetPxY - this.infoDiv.clientHeight}px - 1.5rem)`);
            this.infoDotDiv.style.setProperty('top', `${offsetPxY - (this.infoDotDiv.clientHeight / 2)}px`);
            this.infoDotDiv.style.setProperty('left', `${(pointValue.point.x / this.viewBoxWidth) * this.svg.clientWidth - (this.infoDotDiv.clientWidth / 2) + (this.baseDiv.clientWidth - this.svg.clientWidth)}px`);
            this.onCurrentPointChanged(pointValue.value);
            this.currentPointValue = pointValue;
        }
    }
    mouseLeave() {
        this.isMouseAbove = false;
        this.infoDiv.classList.add('hidden');
        this.infoDotDiv.classList.add('hidden');
    }
    mouseEnter() {
        this.isMouseAbove = true;
        this.infoDiv.classList.remove('hidden');
        this.infoDotDiv.classList.remove('hidden');
    }
    findPoint(offsetX) {
        let before = this.chartDomPoints[0];
        for (let i = 1; i < this.chartDomPoints.length; i++) {
            const current = this.chartDomPoints[i];
            const m = (current.point.x - before.point.x) / 2 + before.point.x;
            if (offsetX <= m)
                return before;
            else
                before = current;
        }
        return before;
    }
    getTotalDaysCount(from, to) {
        return Math.round((to.getTime() - from.getTime()) / (3600000 * 24));
    }
    getDatesOfNthDay(nthDay, minDaysCount) {
        const dates = [];
        let lastDate = nthDay;
        for (let d = 0; d <= minDaysCount; d++) {
            const date = DateHelper.addDays(nthDay, d * -1);
            if (date.getDate() === nthDay.getDate())
                dates.push(date);
            lastDate = date;
        }
        if (lastDate.getDate() !== nthDay.getDate()) {
            for (let d = 1; d <= 31; d++) {
                const date = DateHelper.addDays(lastDate, d * -1);
                if (date.getDate() === nthDay.getDate()) {
                    dates.push(date);
                    break;
                }
            }
        }
        return dates.reverse();
    }
}
