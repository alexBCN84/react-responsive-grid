// rollup.config.js
import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

const config = {
    input: 'src/grid.js',
    external: ['react', 'radium', 'prop-types'],
    output: {
        format: 'umd',
        name: 'grid',
        globals: {
            react: "React",
            radium: "Radium",
            ["prop-types"]: "PropTypes"
        }
    },
    plugins: [
        babel({
            exclude: "node_modules/**"
        }),
        uglify(),
        resolve()
    ]
};

export default config;