const sass = require('node-sass'),
    { dirname } = require('path');


async function processSass({ content, attributes, filename }) {
    if (attributes.lang !== 'scss') return;

    const { css, stats } = await new Promise((resolve, reject) => sass.render({
			file: filename,
			data: content,
			includePaths: [
				dirname(filename),
			],
		}, (err, result) => {
			if (err) reject(err);
			else resolve(result);
		}));

    return {
        code: css.toString(),
        dependencies: stats.includedFiles
    };
}

module.exports = processSass;