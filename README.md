# React Responsive Grid Library

Full documentation and API with examples here [react-responsive-grid](https://react-responsive-grid.netlify.com/documentation)

## Description

React-responsive-grid is a package offering a grid layout system for your react projects. It's easy to use and highly customisable via props. It works in a very similar way to other grids in frontend frameworks like Bootstrap or Semantic UI. The main difference is the high level of flexibility that react-responsive-grid uses. It allows you to set up the number of columns you want for your grid (default is set to 12). You pretty much have full control over your grid because all default styles can be overridden simply by passing your own styles into the grid via the style prop.


## Requirements
- Node.js 8.8+
- NPM 5+ / yarn


## Setup instructions

1\. Install the package with npm or yarn
 ```
 npm install --save react-grid-lib
 ```
 or

 ```
 yarn add react-grid-lib --save
 ```


2\. Import the library in the component where you want to use it:

```
import {Grid, Row, Col} from 'react-grid-lib';
```


## Grid API

<PropsTable of={Grid} />

### Customisation of the Grid Component
- Set width to fullWidth.
- Set custom value for gutters.
- Set custom styles.
- Set custom maxWidth. Default value is 1200px.

Example of fullWidth customised Grid
```
<Grid style={{backgroundColor: 'red'}} fullWidth gutters={20}></Grid>
```
Example of Grid with custom maxWidth set 1400px
```
<Grid style={{backgroundColor: 'red'}} maxWidth={1400} gutters={20}></Grid>
```

## Row API
<PropsTable of={Row} />

### Customisation of the Row Component
- Set custom total number of columns. Default is 12.
- Set custom option for align. Valid value are 'left', 'right' and 'center'. Default value is 'center'.
- Set custom styles for rows.
- Reverse the order of the columns in the row. 

Example of reversed Row with left alignment and 16 columns
```
<Grid style={{backgroundColor: 'red'}} fullWidth gutters={20}>
    <Row reverse styles={{backgroundColor: 'yellow'}} totalCols={16} align="left"></Row>
</Grid>
```


## Col API
<PropsTable of={Col} />

### Basic example of layout with 16 columns aligned left and same width for all devices

```
 <Grid style={{backgroundColor: 'AliceBlue'}} fullWidth gutters={10}>
    <Row reverse totalCols={16} align="left">
        <Col width={6} style={{backgroundColor: 'red'}}>
        <div>6 col block</div>
        </Col>
        <Col width={6} style={{backgroundColor: 'blue'}}>
        <div> 6 col block</div>
        </Col>
        <Col width={3} style={{backgroundColor: 'green'}}>
        <div>3 col block</div>
        </Col>
    </Row>
</Grid>
```


### Basic example of layout with 16 columns with offset and align left

```
 <Grid style={{backgroundColor: 'AliceBlue'}} fullWidth gutters={10}>
    <Row reverse totalCols={16} align="left">
        <Col width={6} offset={4} style={{backgroundColor: 'red'}}>
        <div>6 col block</div>
        </Col>
        <Col width={6} style={{backgroundColor: 'blue'}}>
        <div> 6 col block</div>
        </Col>
        <Col width={3} style={{backgroundColor: 'green'}}>
        <div>3 col block</div>
        </Col>
    </Row>
</Grid>
```



### Example of responsive layout with different width columns for different breakpoints

```
 <Grid style={{backgroundColor: 'AliceBlue'}} fullWidth gutters={10}>
    <Row reverse align="left">
        <Col mobile={10} mobileOffset={2} style={{backgroundColor: 'red'}}>
        <div>block 1</div>
        </Col>
        <Col width={6} style={{backgroundColor: 'blue'}}>
        <div>block 2</div>
        </Col>
        <Col width={6} style={{backgroundColor: 'green'}}>
        <div>block 3</div>
        </Col>
    </Row>
</Grid>
```



