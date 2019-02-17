import React from 'react';
import Radium, { StyleRoot } from 'radium';
import breakpoint from './breakpoints';
import { PropTypes } from 'prop-types';

const grid = (props) => {

    const gridStyles = {
        width: "100%",
        maxWidth: ((props.fullWidth && "100%") || (props.maxWidth && props.maxWidth)) || "1200px",
        margin: "0 auto"
    };

    const { children } = props;
    const rows = React.Children.map(children, child =>
        React.cloneElement(child, { gutters: props.gutters, reverse: props.reverse })
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
        marginLeft: props.gutters ? -(props.gutters / 2) : -16,
        marginRight: props.gutters ? -(props.gutters / 2) : -16,
        padding: 0,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: columnsAlignment,
        flexFlow: props.reverse ? "row-reverse wrap" : "wrap"
    }

    const { children } = props;

    const columns = React.Children.map(children, child =>
        React.cloneElement(child, { gutters: props.gutters, totalCols: props.totalCols || 12 })
    );

    return <div style={{ ...componentStyles, ...props.style }}>{columns}</div>;
}

row.propTypes = {
    align: PropTypes.string,
    gutters: PropTypes.number,
    reverse: PropTypes.bool,
    children: PropTypes.node.isRequired
}

const col = (props) => {
    const spanning = (nOfCols = 0, totalCols, offset) => {

        const oneColSpan = 100 / totalCols;
        if (nOfCols === 0) return 0;
        if (nOfCols < 0 || nOfCols % 1 !== 0) return (function () { throw `${nOfCols} is not a valid number for this row` }());
        if (nOfCols > totalCols) return (function () { throw `the maximum number of columns for this row is ${totalCols}` }());
        const width = nOfCols === undefined ? null : ({ width: `${oneColSpan * nOfCols}%` })
        const marginLeft = offset === undefined ? null : ({ marginLeft: `${oneColSpan * offset}%` });
        return {
            display: nOfCols === 0 ? 'none' : 'block',
            ...width,
            ...marginLeft
        };
    };

    const { width, mobile, phablet, tablet, desktop, wideDesktop, totalCols } = props;
    const { offset, mobileOffset, phabletOffset, tabletOffset, desktopOffset, wideDesktopOffset } = props;

    if (
        width === undefined &&
        mobile === undefined &&
        phablet === undefined &&
        tablet === undefined &&
        desktop === undefined &&
        wideDesktop === undefined
    ) return (function () { throw `Use at least one of the following props to assign column span: width, mobile, phablet, tablet, desktop, wideDesktop.` }())

    const columnStyles = {
        position: "relative",
        padding: props.gutters === 0 ? 0 : (props.gutters / 2) || 16,
        ...spanning(width, totalCols, offset),
        [breakpoint.mobile]: {
            ...spanning(mobile, totalCols, mobileOffset)
        },
        [breakpoint.phablet]: {
            ...spanning(phablet, totalCols, phabletOffset)
        },
        [breakpoint.tablet]: {
            ...spanning(tablet, totalCols, tabletOffset)
        },
        [breakpoint.desktop]: {
            ...spanning(desktop, totalCols, desktopOffset)
        },
        [breakpoint.wideDesktop]: {
            ...spanning(wideDesktop, totalCols, wideDesktopOffset)
        }
    }

    return (
        <div style={{ ...columnStyles, ...props.style }}>{props.children}</div>
    )
};

col.propTypes = {
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

const Grid = <StyleRoot>Radium(grid)</StyleRoot>;
const Row = Radium(row);
const Col = Radium(col);

export { Grid, Row, Col };

