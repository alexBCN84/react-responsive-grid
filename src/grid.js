import React, {Component} from 'react';
import { PropTypes } from 'prop-types';

const grid = (props) => {
    
    const gridStyles = {
        position: "relative",
        width: "100%",
        maxWidth: ((props.fullWidth && "100%") || (props.maxWidth && props.maxWidth)) || "1200px",
        margin: "0 auto"
    };
    const gutters = (props.gutters === 0 && 1) || (props.gutters || 32);
    const { children } = props;
    const rows = React.Children.map(children, child =>
        React.cloneElement(child, { gutters: gutters, reverse: props.reverse })
    );
    return (
       <div style={{ ...gridStyles, ...props.style }}>{rows}</div>
    )
}

grid.propTypes = {
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.number,
    children: PropTypes.node.isRequired
}

const row = (props) => {
    const columnsAlignment = (
        props.align && props.align === "left" ? "flex-start"
            : props.align && props.align === "right" ? "flex-end"
                : (
                    props.align === "space-between" ||
                    props.align === "space-around" ||
                    props.align === "space-evenly"
                ) ? props.align
                    : "center"
    );
    const componentStyles = {
        paddingLeft: props.gutters / 2,
        paddingRight: props.gutters / 2,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: columnsAlignment,
        flexFlow: props.reverse ? "row-reverse wrap" : "wrap"
    }


    const { children } = props;
    const mqls = [
        window.matchMedia("(min-width: 0px)"),
        window.matchMedia("(min-width: 480px)"),
        window.matchMedia("(min-width: 768px)"),
        window.matchMedia("(min-width: 1024px)"),
        window.matchMedia("(min-width: 1280px)")
    ]
    const columns = React.Children.map(children, child =>
        React.cloneElement(child, { mqls: mqls, gutters: props.gutters, totalCols: props.totalCols || 12 })
    );

    return <div style={{ ...componentStyles, ...props.style }}>{columns}</div>;
}

row.propTypes = {
    align: PropTypes.string,
    gutters: PropTypes.number,
    reverse: PropTypes.bool,
    children: PropTypes.node.isRequired
}
class Column extends Component {
    state = {
        position: "relative",
        margin: this.props.gutters / 2
    }
    componentDidMount(){
        for (var i=0; i<this.props.mqls.length; i++){
            this.mediaqueryresponse(this.props.mqls[i]) // call listener function explicitly at run time
            this.props.mqls[i].addListener(this.mediaqueryresponse) // attach listener function to listen in on state changes
        }
    }

    mediaqueryresponse = (mql) => {
        const { width, mobile, phablet, tablet, desktop, wideDesktop, totalCols } = this.props;
        const { offset, mobileOffset, phabletOffset, tabletOffset, desktopOffset, wideDesktopOffset } = this.props;
        const spanning = (nOfCols = 0, totalCols, offset, gutters) => {
            if (nOfCols === 0) return 0;
            if (nOfCols < 0 || nOfCols % 1 !== 0) return (function () { throw `${nOfCols} is not a valid number for this row` }());
            if (nOfCols > totalCols) return (function () { throw `the maximum number of columns for this row is ${totalCols}` }());
            const width = nOfCols === undefined ? null : ({ width: `calc(100% / 12 * ${nOfCols} - ${gutters}px)`}) 
            const marginLeft = offset === undefined ? null : ({ marginLeft:`calc(100% / 12 * ${offset} - ${gutters}px)`});
            return {
                display: nOfCols === 0 ? 'none' : 'block',
                ...width,
                ...marginLeft
            };
        };
        if (
            width === undefined &&
            mobile === undefined &&
            phablet === undefined &&
            tablet === undefined &&
            desktop === undefined &&
            wideDesktop === undefined
        ) return (function () { throw `Use at least one of the following props to assign column span: width, mobile, phablet, tablet, desktop, wideDesktop.` }())
    
            
        if ((width || mobile) && this.props.mqls[0].matches){ // {min-width: 0px} query matched
            this.setState({...this.state, ...spanning(mobile || width, totalCols, offset, this.props.gutters)});
        }
        if (phablet && this.props.mqls[1].matches){ // {min-width: 480px} query matched
            this.setState({...this.state, ...spanning(phablet, totalCols, offset, this.props.gutters)});
        }
        if (tablet && this.props.mqls[2].matches){ // {min-width: 768px} query matched
            this.setState({...this.state, ...spanning(tablet, totalCols, offset, this.props.gutters)});
        }
        if (desktop && this.props.mqls[3].matches){ // {min-width: 1024px} query matched
            this.setState({...this.state, ...spanning(desktop, totalCols, offset, this.props.gutters)});
        }
        if (wideDesktop && this.props.mqls[4].matches){ // {min-width: 1280px} query matched
            this.setState({...this.state, ...spanning(wideDesktop, totalCols, offset, this.props.gutters)});
        }
        console.log(this.state)
    }
    componentWillUnmount() {
        for (var i=0; i<this.props.mqls.length; i++){
            this.props.mqls[i].removeListener(this.mediaqueryresponse) // remove listener function on state changes
        }
        
    }
    render() {
        return <div style={{...this.state, ...this.props.style }}>{this.props.children}</div>
    }
}


Column.propTypes = {
    styles: PropTypes.object,
    gutters: PropTypes.number,
    width: PropTypes.number,
    mobile: PropTypes.number,
    phablet: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
    wideDesktop: PropTypes.number,
    totalCols: PropTypes.number,
    offset: PropTypes.number,
    mobileOffset: PropTypes.number,
    phabletOffset: PropTypes.number,
    tabletOffset: PropTypes.number,
    desktopOffset: PropTypes.number,
    wideDesktopOffset: PropTypes.number,
    children: PropTypes.node
}

const Grid = grid;
const Row = row;
const Col = Column;

export { Grid, Row, Col };

