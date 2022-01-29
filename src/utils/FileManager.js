export const sanitizeFile = (file) => {
	if (!file.name) return false;

	//remove all non word characters, replace spaces with _
	//TODO: use regex
	let [fileName, ext] = file.name.split('.');
	fileName = fileName
		.replaceAll(/\s/g, '_')
		.replaceAll(/\W/g, '');

	file.name = `${fileName}.${ext}`;
	file.filename = fileName;
	return file;
};