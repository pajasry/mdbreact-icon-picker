// rollup.config.js
import uglify from 'rollup-plugin-uglify'
import typescript from '@rollup/plugin-typescript';
import babel from 'rollup-plugin-babel'

const config = {
	input: 'src/index.tsx',
	external: ['react'],
	output: {
		format: 'umd',
		name: 'mdbreact-icon-picker',
		globals: {
			react: "React",
			mdbreact:"mdbreact"
		}
	},
	plugins: [
		babel({
			exclude: "node_modules/**"
		}),
		typescript(),
	],
}
export default config