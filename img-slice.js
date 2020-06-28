const { createCanvas, loadImage } = require('canvas')
const fs = require('fs')

var myArgs = process.argv.slice(2);
var img_url = myArgs[0]
var cols = myArgs[1]
var rows = myArgs[2]

var img;
var img_width;
var img_height;


loadImage(img_url).then((image) =>	{
	
	img = image;
	img_width = img.width;
	img_height = img.height;
	gen();
});


function gen()	{
	
	var s_w = Math.floor(img_width / cols);
	var s_h = Math.floor(img_height / rows);
		
	//console.log("IMAGE WIDTH: " + img_width)
	
	var arr = []
	for (var i = 0; i < (rows*cols); i++)	{
		
		arr[i] = createCanvas(
			Math.ceil(img_width/cols),
			Math.ceil(img_height/rows)
		)
		//console.log("canvas " + i + " created.");
	}

	for(var j = 0; j < cols; j++)	{
		
		for (var l = 0; l < rows; l++)	{
			
			const ctx = arr[j].getContext('2d')
			console.log("s_w * col = " + s_w * j + "\ts_h * row = " + s_h * l);
			ctx.drawImage(img, s_w * j, s_h * l, s_w, s_h, 0, 0, s_w, s_h);

			const buffer = arr[j].toBuffer('image/png')
			fs.writeFileSync('./image'+j+'.png', buffer)
		}
	}

	console.log("Images generated. " + rows*cols + " images.")
}