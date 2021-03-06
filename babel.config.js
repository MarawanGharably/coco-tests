module.exports = {
	// presets are applied from bottom to top
	presets: ['@babel/preset-env', '@babel/preset-react'],
	// plugins are applied from top to bottom
	plugins: [
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-syntax-import-assertions',
		[
			'transform-react-remove-prop-types',
			{
				mode: 'remove',
				removeImport: 'true',
				ignoreFilenames: ['node_modules'],
			},
		],
		[
			'@babel/plugin-proposal-class-properties',
			// {
			//     loose: true,
			// },
		],
		'@babel/plugin-transform-runtime',
	],
};
