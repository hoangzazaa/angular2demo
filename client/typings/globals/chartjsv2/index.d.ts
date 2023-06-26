interface ChartConstructor {
    new (ctx: HTMLCanvasElement | CanvasRenderingContext2D | JQuery | string, config: ChartConfig): Chart;
}
interface Chart {
    /** Use this to destroy any chart instances that are created. This will clean up any references stored to the chart object within Chart.js, along with any associated event listeners attached by Chart.js. This must be called before the canvas is reused for a new chart. */
    destroy(): any;
    /** Triggers an update of the chart. This can be safely called after replacing the entire data object. This will update all scales, legends, and then re-render the chart. */
    update(duration?: number, lazy?: boolean): any;
    /** Reset the chart to it's state before the initial animation. A new animation can then be triggered using update. */
    reset(): any;
    /** Triggers a redraw of all chart elements. Note, this does not update elements for new data. Use .update() in that case. */
    render(duration?: number, lazy?: boolean): any;
    /** Use this to stop any current animation loop. This will pause the chart during any current animation frame. Call .render() to re-animate. */
    stop(): any;
    /** Use this to manually resize the canvas element. This is run each time the canvas container is resized, but you can call this method manually if you change the size of the canvas nodes container element. */
    resize(): any;
    /** Will clear the chart canvas. Used extensively internally between animation frames, but you might find it useful. */
    clear(): any;
    /** This returns a base 64 encoded string of the chart in it's current state. */
    toBase64Image(): string;
    /** Returns an HTML string of a legend for that chart. The legend is generated from the legendCallback in the options. */
    generateLegend(): string;
    /** Calling getElementAtEvent(event) on your Chart instance passing an argument of an event, or jQuery event, will return the single element at the event position. If there are multiple items within range, only the first is returned. */
    getElementAtEvent(e: Event | JQueryEventObject): any;
    //todo: getDatasetAtEvent(e);
    //todo: getDatasetMeta(index)
}

/// core
interface ChartCoreData<T> {
    /** Contains data for each dataset. */
    datasets: T[];
    /** Optional parameter that is used with the category axis. */
    labels?: string[] | (string | string[])[];
    /** Optional parameter that is used with the category axis and is used if the axis is horizontal. */
    xLabels?: string[] | (string | string[])[];
    /** Optional parameter that is used with the category axis and is used if the axis is vertical. */
    yLabels?: string[] | (string | string[])[];
}

type color = string | CanvasGradient | CanvasPattern;

interface FontSettings {
    /** Default font color for all text. */
    defaultFontColor?: color;
    /** Default font family for all text. */
    defaultFontFamily?: string;
    /** Default font size (in px) for text. Does not apply to radialLinear scale point labels. */
    defaultFontSize?: number;
    /** Default font style. Does not apply to tooltip title or footer. Does not apply to chart title. */
    defaultFontStyle?: string;
}

interface ChartCoreOptions {
    /** Resizes the chart canvas when its container does. */
    responsive?: boolean;
    /** Duration in milliseconds it takes to animate to new size after a resize event. */
    responsiveAnimationDuration?: number;
    /** Maintain the original canvas aspect ratio (width / height) when resizing. */
    maintainAspectRatio?: boolean;
    /** Events that the chart should listen to for tooltips and hovering. */
    events?: string[];
    /** Called if the event is of type 'mouseup' or 'click'. Called in the context of the chart and passed the event and an array of active elements. */
    onClick?: Function;
    /** Function to generate a legend. Receives the chart object to generate a legend from. Default implementation returns an HTML string. */
    legendCallback?: (chart) => string;
    /** Called when a resize occurs. Gets passed two arguments: the chart instance and the new size. */
    onResize?: Function;
    /** Layout Configuration. */
    layout?: ChartOptionsLayout;
    /** Title Configuration. */
    title?: ChartOptionsTitle;
    /** Legend Configuration. */
    legend?: ChartOptionsLegend;
    /** Tooltip Configuration. */
    tooltip?: ChartOptionsTooltip;
    /** Hover Configuration. */
    hover?: ChartOptionsHover;
    /** Animation Configuration. */
    animation?: ChartOptionsAnimation;
    /** Element Configuration. */
    elements?: ChartOptionsElements;
}

interface ChartOptionsLayout {
    /** The padding to add inside the chart. If this value is a number, it is applied to all sides of the chart (left, top, right, bottom).
     * If this value is an object, the left property defines the left padding. Similarly the right, top, and bottom properties can also be specified. */
    padding: number | {left: number, top: number, right: number, bottom: number};
}

type Position = 'top' | 'left' | 'bottom' | 'right';

interface ChartOptionsTitle {
    /** Display the title block. */
    display?: boolean;
    /** Position of the title. */
    position?: Position;
    /** Marks that this box should take the full width of the canvas (pushing down other boxes). */
    fullWidth?: boolean;
    /** Font size inherited from global configuration. */
    fontSize?: number;
    /** Font family inherited from global configuration. */
    fontFamily?: string;
    /** Font color inherited from global configuration. */
    fontColor?: color;
    /** Font styling of the title. */
    fontStyle?: string;
    /** Number of pixels to add above and below the title text. */
    padding?: number;
    /** Title text. */
    text?: string;
}

interface ChartOptionsLegend {
    /** Is the legend displayed. */
    display?: boolean;
    /** Position of the legend. */
    position?: Position;
    /** Marks that this box should take the full width of the canvas (pushing down other boxes). */
    fullWidth?: boolean;
    /** A callback that is called when a 'click' event is registered on top of a label item. */
    onClick?: (event: Event, legendItem: LegendItem) => void;
    /** A callback that is called when a 'mousemove' event is registered on top of a label item. */
    onHover?: (event: Event, legendItem: LegendItem) => void;
    /** Legend Labels Configuration. */
    labels?: ChartOptionsLegendLabels;
    /** Legend will show datasets in reverse order. */
    reverse?: boolean;
}

interface ChartOptionsLegendLabels {
    /** Width of coloured box. */
    boxWidth?: number;
    /** Font size inherited from global configuration. */
    fontSize?: number;
    /** Font style inherited from global configuration. */
    fontStyle?: string;
    /** Font color inherited from global configuration. */
    fontColor?: color;
    /** Font family inherited from global configuration. */
    fontFamily?: string;
    /** Padding between rows of colored boxes. */
    padding?: number;
    /** Generates legend items for each thing in the legend. */
    generateLabels?: (chart) => string;
    /** Filters legend items out of the legend. */
    filter?: (legendItem: LegendItem, chartData: any) => any;
    /** Label style will match corresponding point style (size is based on fontSize, boxWidth is not used in this case). */
    usePointStyle?: boolean;
}

interface LegendItem {
    /** Label that will be displayed. */
    text: string;
    /** Fill style of the legend box. */
    fillStyle: color;
    /** If true, this item represents a hidden dataset. Label will be rendered with a strike-through effect. */
    hidden: Boolean;
    /** For box border. See https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap. */
    lineCap: string;
    /** For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash. */
    lineDash: number[];
    /** For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset. */
    lineDashOffset: number;
    /** For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin. */
    lineJoin: string;
    /** Width of box border. */
    lineWidth: number;
    /** Stroke style of the legend box. */
    strokeStyle: color;
    /** Point style of the legend box (only used if usePointStyle is true). */
    pointStyle: string;
}

interface ChartOptionsTooltip {
    /** Are tooltips enabled. */
    enabled?: boolean;
    //custom?: Function;
    /** Sets which elements appear in the tooltip. */
    mode?: InteractionMode;
    /** if true, the tooltip mode applies only when the mouse position intersects with an element. If false, the mode will be applied at all times. */
    intersect?: boolean;
    /** The mode for positioning the tooltip. 'average' mode will place the tooltip at the average position of the items displayed in the tooltip. 'nearest' will place the tooltip at the position of the element closest to the event position. */
    position?: 'average' | 'nearest';
    /** Allows sorting of tooltip items. Must implement at minimum a function that can be passed to Array.prototype.sort. This function can also accept a third parameter that is the data object passed to the chart. */
    itemSort?: Function;
    /** Allows filtering of tooltip items. Must implement at minimum a function that can be passed to Array.prototype.filter. This function can also accept a second parameter that is the data object passed to the chart. */
    filter?: Function;
    /** Background color of the tooltip. */
    backgroundColor?: color;
    /** Font family for tooltip title inherited from global font family. */
    titleFontFamily?: string;
    /** Font size for tooltip title inherited from global font size. */
    titleFontSize?: number;
    titleFontStyle?: string;
    /** Font color for tooltip title. */
    titleFontColor?: color;
    /** Spacing to add to top and bottom of each title line. */
    titleSpacing?: number;
    /** Margin to add on bottom of title section. */
    titleMarginBottom?: number;
    /** Font family for tooltip items inherited from global font family. */
    bodyFontFamily?: string;
    /** Font size for tooltip items inherited from global font size. */
    bodyFontSize?: number;
    bodyFontStyle?: string;
    /** Font color for tooltip items. */
    bodyFontColor?: color;
    /** Spacing to add to top and bottom of each tooltip item. */
    bodySpacing?: number;
    /** Font family for tooltip footer inherited from global font family. */
    footerFontFamily?: string;
    /** Font size for tooltip footer inherited from global font size. */
    footerFontSize?: number;
    /** Font style for tooltip footer. */
    footerFontStyle?: string;
    /** Font color for tooltip footer. */
    footerFontColor?: color;
    /** Spacing to add to top and bottom of each footer line. */
    footerSpacing?: number;
    /** Margin to add before drawing the footer. */
    footerMarginTop?: number;
    /** Padding to add on left and right of tooltip. */
    xPadding?: number;
    /** Padding to add on top and bottom of tooltip. */
    yPadding?: number;
    /** Size, in px, of the tooltip arrow. */
    caretSize?: number;
    /** Radius of tooltip corner curves. */
    cornerRadius?: number;
    /** Color to draw behind the colored boxes when multiple items are in the tooltip. */
    multiKeyBackground?: color;
    /** if true, color boxes are shown in the tooltip. */
    displayColors?: boolean;
    /** Tooltip Callbacks. */
    callbacks?: ChartOptionsTooltipCallbacks;
}

interface ChartOptionsTooltipCallbacks {
    /** Text to render before the title. */
    beforeTitle?: (tooltipItem: TooltipItem[], data: any) => string | string[];
    /** Text to render as the title. */
    title?: (tooltipItem: TooltipItem[], data: any) => string | string[];
    /** Text to render after the title. */
    afterTitle?: (tooltipItem: TooltipItem[], data: any) => string | string[];
    /** Text to render before the body section. */
    beforeBody?: (tooltipItem: TooltipItem[], data: any) => string | string[];
    /** Text to render before an individual label. */
    beforeLabel?: (tooltipItem: TooltipItem, data: any) => string | string[];
    /** Text to render for an individual item in the tooltip. */
    label?: (tooltipItem: TooltipItem, data: any) => string | string[];
    /** Returns the colors to render for the tooltip item. */
    labelColor?: (tooltipItem: TooltipItem, data: any) => {borderColor: string, backgroundColor: string};
    /** Text to render after an individual label. */
    afterLabel?: (tooltipItem: TooltipItem, data: any) => string | string[];
    /** Text to render after the body section. */
    afterBody?: (tooltipItem: TooltipItem[], data: any) => string | string[];
    /** Text to render before the footer section. */
    beforeFooter?: (tooltipItem: TooltipItem[], data: any) => string | string[];
    /** Text to render as the footer. */
    footer?: (tooltipItem: TooltipItem[], data: any) => string | string[];
    /** Text to render after the footer section. */
    afterFooter?: (tooltipItem: TooltipItem[], data: any) => string | string[];
    /** List of matching point informations. */
    dataPoints?: (tooltipItem: TooltipItem[], data: any) => string | string[];
}

interface TooltipItem {
    /** X Value of the tooltip as a string. */
    xLabel: String;
    /** Y value of the tooltip as a string. */
    yLabel: String;
    /** Index of the dataset the item comes from. */
    datasetIndex: Number;
    /** Index of this data item in the dataset. */
    index: Number;
    /** X position of matching point. */
    x: Number;
    /** Y position of matching point. */
    y: Number;
}

type InteractionMode = 'point' | 'nearest' | 'index' | 'dataset' | 'x' | 'y'  | 'label';

interface ChartOptionsHover {
    /** Sets which elements appear in the tooltip. . */
    mode?: InteractionMode;
    /** if true, the hover mode only applies when the mouse position intersects an item on the chart. */
    intersect?: boolean;
    /** Duration in milliseconds it takes to animate hover style changes. */
    animationDuration?: number;
    /** Called when any of the events fire. Called in the context of the chart and passed the event and an array of active elements (bars, points, etc). */
    onHover?: Function;
}

type Easing = 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint' | 'easeInSine' | 'easeOutSine' | 'easeInOutSine' | 'easeInExpo' | 'easeOutExpo' | 'easeInOutExpo' | 'easeInCirc' | 'easeOutCirc' | 'easeInOutCirc' | 'easeInElastic' | 'easeOutElastic' | 'easeInOutElastic' | 'easeInBack' | 'easeOutBack' | 'easeInOutBack' | 'easeInBounce' | 'easeOutBounce' | 'easeInOutBounce';

interface ChartOptionsAnimation {
    /** The number of milliseconds an animation takes. */
    duration?: number;
    /** Easing function to use. */
    easing?: Easing;
    /** Callback called on each step of an animation. */
    onProgress?: (chartInstance: any, animationObject: AnimationObject) => void;
    /** Callback called at the end of an animation. */
    onComplete?: (chartInstance: any, animationObject: AnimationObject) => void;
}

interface AnimationObject {
    /** Current Animation frame number. */
    currentStep: Number,
    /** Number of animation frames. */
    numSteps: Number,
    /** Animation easing to use. */
    easing: String,
    /** Function that renders the chart. */
    render: Function,
    /** User callback. */
    onAnimationProgress: Function,
    /** User callback. */
    onAnimationComplete: Function
}

interface ChartOptionsElements {
    /** Arcs are used in the polar area, doughnut and pie charts. */
    arc?: ChartOptionsElementsArc;
    /** Line elements are used to represent the line in a line chart. */
    line?: ChartOptionsElementsLine;
    /** Point elements are used to represent the points in a line chart or a bubble chart. . */
    point?: ChartOptionsElementsPoint;
    /** Rectangle elements are used to represent the bars in a bar chart. . */
    rectangle?: ChartOptionsElementsRectangle;
}

interface ChartOptionsElementsArc {
    /** Default fill color for arcs. Inherited from the global default. */
    backgroundColor?: color;
    /** Default stroke color for arcs. */
    borderColor?: color;
    /** Default stroke width for arcs. */
    borderWidth?: number;
}

type CapStyle = 'butt' | 'round' | 'square';

type JoinStyle = 'bevel' | 'round' | 'miter';

interface ChartOptionsElementsLine {
    /** Default bezier curve tension. Set to 0 for no bezier curves. */
    tension?: number;
    /** Default line fill color. */
    backgroundColor?: color;
    /** Default line stroke width. */
    borderWidth?: number;
    /** Default line stroke color. */
    borderColor?: color;
    /** Default line cap style. */
    borderCapStyle?: CapStyle;
    /** Default line dash. */
    borderDash?: number[];
    /** Default line dash offset. */
    borderDashOffset?: number;
    /** Default line join style. */
    borderJoinStyle?: JoinStyle;
    /** If true, bezier control points are kept inside the chart. If false, no restriction is enforced. */
    capBezierPoints?: boolean;
    /** If true, the fill is assumed to be to zero. String values are to fill to different locations. If false, no fill is added. */
    fill?: boolean | 'zero' | 'top' | 'bottom';
    /** If true, the line is shown as a stepped line and 'tension' will be ignored. */
    stepped?: boolean;
}

interface ChartOptionsElementsPoint {
    /** Default point radius. */
    radius?: number;
    /** Default point style. */
    pointStyle?: string;
    /** Default point fill color. */
    backgroundColor?: color
    /** Default point stroke width. */
    borderWidth?: number;
    /** Default point stroke color. */
    borderColor?: color
    /** Extra radius added to point radius for hit detection. */
    hitRadius?: number;
    /** Default point radius when hovered. */
    hoverRadius?: number;
    /** Default stroke width when hovered. */
    hoverBorderWidth?: number;
}

interface ChartOptionsElementsRectangle {
    /** Default bar fill color. */
    backgroundColor?: color;
    /** Default bar stroke width. */
    borderWidth?: number;
    /** Default bar stroke color. */
    borderColor?: color;
    /** Default skipped (excluded) border for rectangle. */
    borderSkipped?: Position;
}

// todo: scale
// todo: Advanced usage


// charts
type ChartType = 'line' | 'bar' | 'radar' | 'polarArea' | 'pie' | 'doughnut' | 'bubble';

type ChartConfig = LineChartConfig | BarChartConfig | RadarChartConfig | PolarAreaChartConfig | PieChartConfig | DoughnutChartConfig | BubbleChartConfig;

type ChartData = LineChartData | BarChartData | RadarChartData | PolarAreaChartData | PieChartData | DoughnutChartData | BubbleChartData;

type ChartOptions = LineChartOptions | BarChartOptions | RadarChartOptions | PolarAreaChartOptions | PieChartOptions | DoughnutChartOptions | BubbleChartOptions;

// line
/** A line chart is a way of plotting data points on a line. Often, it is used to show trend data, and the comparison of two data sets. */
interface LineChartConfig {
    type: 'line';
    data: LineChartData;
    options?: LineChartOptions;
}

export type LineChartData = ChartCoreData<LineChartDataset>;

interface LineChartOptions extends ChartCoreOptions {
    /** If false, the lines between points are not drawn. */
    showLines?: boolean;
    /** If true, NaN data does not break the line. */
    spanGaps?: boolean;
}

type PointStyle = 'circle' | 'triangle' | 'rect' | 'rectRounded' | 'rectRot' | 'cross' | 'crossRot' | 'star' | 'line' | 'dash';

type point = {x: number; y: number;};

interface LineChartDataset {
    /** The data to plot in a line. */
    data: number[] | point[];
    /** The label for the dataset which appears in the legend and tooltips. */
    label?: string;
    /** The ID of the x axis to plot this dataset on. */
    xAxisID?: string;
    /** The ID of the y axis to plot this dataset on. */
    yAxisID?: string;
    /** If true, fill the area under the line. */
    fill?: boolean;
    /** Algorithm used to interpolate a smooth curve from the discrete data points. The 'default' algorithm uses a custom weighted cubic interpolation, which produces pleasant curves for all types of datasets. The 'monotone' algorithm is more suited to y = f(x) datasets : it preserves monotonicity (or piecewise monotonicity) of the dataset being interpolated, and ensures local extremums (if any) stay at input data points. */
    cubicInterpolationMode?: 'default' | 'monotone';
    /** Bezier curve tension of the line. Set to 0 to draw straightlines. This option is ignored if monotone cubic interpolation is used. */
    lineTension?: number;
    /** The fill color under the line. */
    backgroundColor?: color;
    /** The width of the line in pixels. */
    borderWidth?: number;
    /** The color of the line. */
    borderColor?: color;
    /** Cap style of the line. */
    borderCapStyle?: string;
    /** Length and spacing of dashes. */
    borderDash?: number[];
    /** Offset for line dashes. */
    borderDashOffset?: number;
    /** Line joint style. */
    borderJoinStyle?: JoinStyle;
    /** The border color for points. */
    pointBorderColor?: color | color[];
    /** The fill color for points. */
    pointBackgroundColor?: color | color[];
    /** The width of the point border in pixels. */
    pointBorderWidth?: number | number[];
    /** The radius of the point shape. If set to 0, nothing is rendered. */
    pointRadius?: number | number[];
    /** The radius of the point when hovered. */
    pointHoverRadius?: number | number[];
    /** The pixel size of the non-displayed point that reacts to mouse events. */
    pointHitRadius?: number | number[];
    /** Point background color when hovered. */
    pointHoverBackgroundColor?: color | color[];
    /** Point border color when hovered. */
    pointHoverBorderColor?: color | color[];
    /** Border width of point when hovered. */
    pointHoverBorderWidth?: number | number[];
    /** The style of point. If the option is an image, that image is drawn on the canvas using drawImage. */
    pointStyle?: PointStyle | PointStyle[] | HTMLImageElement | HTMLImageElement[];
    /** If false, the line is not drawn for this dataset. */
    showLine?: boolean;
    /** If true, lines will be drawn between points with no or null data. */
    spanGaps?: boolean;
    /** If true, the line is shown as a stepped line and 'lineTension' will be ignored. */
    steppedLine?: boolean;
}

// bar
/** A bar chart is a way of showing data as bars. It is sometimes used to show trend data, and the comparison of multiple data sets side by side. */
interface BarChartConfig {
    type: 'bar';
    data: BarChartData;
    options?: BarChartOptions;
}

export type BarChartData = ChartCoreData<BarChartDataset>;

interface BarChartOptions extends ChartCoreOptions {
    // hover?
    scales?: BarChartOptionsScales;
}

interface BarChartOptionsScales {
    xAxes?: BarChartOptionsScalesX[];
    yAxes?: BarChartOptionsScalesY[];
}

interface BarChartOptionsScalesX {
    type?: string;
    /** If true, show the scale. */
    display?: boolean;
    /** Id of the axis so that data can bind to it. */
    id?: string;
    /** If true, bars are stacked on the x-axis. */
    stacked?: boolean;
    /**    Manually set width of each bar in pixels. If not set, the bars are sized automatically. */
    barThickness?: number;
    /** Percent (0-1) of the available width (the space between the gridlines for small datasets) for each data-point to use for the bars. . */
    categoryPercentage?: number;
    /** Percent (0-1) of the available width each bar should be within the category percentage. 1.0 will take the whole category width and put the bars right next to each other. */
    barPercentage?: number;
    gridLines: BarChartOptionsScalesXGridLines;
}

interface BarChartOptionsScalesXGridLines {
    /** If true, the bars for a particular data point fall between the grid lines. If false, the grid line will go right down the middle of the bars. */
    offsetGridLines?: boolean;
}

interface BarChartOptionsScalesY {
    type?: string;
    /** If true, show the scale. */
    display?: boolean;
    /** Id of the axis so that data can bind to it. */
    id?: string;
    /** If true, bars are stacked on the y-axis. */
    stacked?: boolean;
    /** Manually set height of each bar in pixels. If not set, the bars are sized automatically. */
    barThickness?: number;
}

interface BarChartDataset {
    /** The data to plot as bars. */
    data: number[];
    /** The label for the dataset which appears in the legend and tooltips. */
    label?: string;
    /** The ID of the x axis to plot this dataset on. */
    xAxisID?: string;
    /** The ID of the y axis to plot this dataset on. */
    yAxisID?: string;
    /** The fill color of the bars. */
    backgroundColor?: color | color[];
    /** Bar border color. */
    borderColor?: color | color[];
    /** Border width of bar in pixels. */
    borderWidth?: number | number[];
    /** Which edge to skip drawing the border for. */
    borderSkipped?: Position | Position[];
    /** Bar background color when hovered. */
    hoverBackgroundColor?: color | color[];
    /** Bar border color when hovered. */
    hoverBorderColor?: color | color[];
    /** Border width of bar when hovered. */
    hoverBorderWidth?: number | number[];
    /** The ID of the group to which this dataset belongs to (when stacked, each group will be a separate stack). */
    stack?: string;
}

// radar
/** A radar chart is a way of showing multiple data points and the variation between them. They are often useful for comparing the points of two or more different data sets. */
interface RadarChartConfig {
    type: 'radar';
    data: RadarChartData;
    options?: RadarChartOptions;
}

export type RadarChartData = ChartCoreData<RadarChartDataset>;

interface RadarChartOptions extends ChartCoreOptions {
    /** Options for the one scale used on the chart. Use this to style the ticks, labels, and grid lines. */
    scale: any;
    // elements.line.lineTension?
    /** The number of degrees to rotate the chart clockwise. */
    startAngle?: number;
}

interface RadarChartDataset {
    /** The data to plot in a line. */
    data: number[];
    /** The label for the dataset which appears in the legend and tooltips. */
    label?: string;
    /** If true, fill the area under the line. */
    fill?: boolean;
    /** Bezier curve tension of the line. Set to 0 to draw straightlines. */
    lineTension?: number;
    /** The fill color under the line. */
    backgroundColor?: color;
    /** The width of the line in pixels. */
    borderWidth?: number;
    /** The color of the line. */
    borderColor?: color;
    /** Cap style of the line. */
    borderCapStyle?: CapStyle;
    /** Length and spacing of dashes. */
    borderDash?: number[];
    /** Offset for line dashes. */
    borderDashOffset?: number;
    /** Line joint style. */
    borderJoinStyle?: JoinStyle;
    /** The border color for points. */
    pointBorderColor?: color | color[];
    /** The fill color for points. */
    pointBackgroundColor?: color | color[];
    /** The width of the point border in pixels. */
    pointBorderWidth?: number | number[];
    /** The radius of the point shape. If set to 0, nothing is rendered. */
    pointRadius?: number | number[];
    /** The radius of the point when hovered. */
    pointHoverRadius?: number | number[];
    /** The pixel size of the non-displayed point that reacts to mouse events. */
    pointHitRadius?: number | number[];
    /** Point background color when hovered. */
    pointHoverBackgroundColor?: color | color[];
    /** Point border color when hovered. */
    pointHoverBorderColor?: color | color[];
    /** Border width of point when hovered. */
    pointHoverBorderWidth?: number | number[];
    /** The style of point. */
    pointStyle?: PointStyle | PointStyle[];
}

// polarArea
/** Polar area charts are similar to pie charts, but each segment has the same angle - the radius of the segment differs depending on the value. This type of chart is often useful when we want to show a comparison data similar to a pie chart, but also show a scale of values for context. */
interface PolarAreaChartConfig {
    type: 'polarArea';
    data: RadarChartData;
    options?: RadarChartOptions;
}

export type PolarAreaChartData = ChartCoreData<PolarAreaChartDataset>;

interface PolarAreaChartOptions extends ChartCoreOptions {
    /** Sets the starting angle for the first item in a dataset */
    startAngle?: number;
    //todo: scale
    //todo: animation
    //todo: legend
}

interface PolarAreaChartDataset {
    /** The data to plot as arcs */
    data: number[];
    /** The label for the dataset which appears in the legend and tooltips */
    label?: string;
    /** The fill color of the arcs. */
    backgroundColor?: color[];
    /** Arc border color */
    borderColor?: color[];
    /** Border width of arcs in pixels */
    borderWidth?: number[];
    /** Arc background color when hovered */
    hoverBackgroundColor?: color[];
    /** Arc border color when hovered */
    hoverBorderColor?: color[];
    /** Border width of arc when hovered */
    hoverBorderWidth?: number[];
}

// pie
interface PieChartConfig {
    type: 'pie';
    data: PieChartData;
    options?: PieChartOptions;
}

export type PieChartData = ChartCoreData<PieChartDataset>;

interface PieChartOptions extends ChartCoreOptions {
    /** The percentage of the chart that is cut out of the middle. */
    cutoutPercentage?: number;
    /** Starting angle to draw arcs from */
    rotation?: number;
    /** Sweep to allow arcs to cover */
    circumference?: number;
    // animation
    // legend
}

interface PieChartDataset {
    /** The data to plot as arcs */
    data: number[];
    /** The label for the dataset which appears in the legend and tooltips */
    label?: string;
    /** The fill color of the arcs. */
    backgroundColor?: color[];
    /** Arc border color */
    borderColor?: color[];
    /** Border width of arcs in pixels */
    borderWidth?: number[];
    /** Arc background color when hovered */
    hoverBackgroundColor?: color[];
    /** Arc border color when hovered */
    hoverBorderColor?: color[];
    /** Border width of arc when hovered */
    hoverBorderWidth?: number[];
}

// doughnut
interface DoughnutChartConfig {
    type: 'doughnut';
    data: DoughnutChartData;
    options?: DoughnutChartOptions;
}

export type DoughnutChartData = ChartCoreData<DoughnutChartDataset>;
type DoughnutChartOptions = PieChartOptions;
type DoughnutChartDataset = PieChartDataset;

// bubble
/** A bubble chart is used to display three dimensions of data at the same time. The location of the bubble is determined by the first two dimensions and the corresponding horizontal and vertical axes. The third dimension is represented by the size of the individual bubbles. */
interface BubbleChartConfig {
    type: 'pie';
    data: BubbleChartData;
    options?: BubbleChartOptions;
}

export type BubbleChartData = ChartCoreData<BubbleChartDataset>;

interface BubbleChartOptions extends ChartCoreOptions {
}

interface BubbleChartDataset {
    /** The data to plot as bubbles. */
    data: BubbleDataObject[];
    /** The label for the dataset which appears in the legend and tooltips */
    label?: string;
    /** The fill color of the bubbles. */
    backgroundColor?: color | color[];
    /** The stroke color of the bubbles. */
    borderColor?: color | color[];
    /** The stroke width of bubble in pixels. */
    borderWidth?: number | number[];
    /** The fill color of the bubbles when hovered. */
    hoverBackgroundColor?: color | color[];
    /** The stroke color of the bubbles when hovered. */
    hoverBorderColor?: color | color[];
    /** The stroke width of the bubbles when hovered. */
    hoverBorderWidth?: number | number[];
    /** Additional radius to add to data radius on hover. */
    hoverRadius?: number | number[];
}

interface BubbleDataObject {
    x: number;
    y: number;
    /** Radius of bubble. This is not scaled. */
    r: number;
}