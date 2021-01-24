const express = require("express");
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const app = express();

const server = app.listen(3000, function() {
	console.log("Node.js is listening to PORT:" + server.address().port);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", function(req, res, next) {
	res.render("index", { link: "", title: "", result: "" });
});

app.post("/comp", function(req, res, next) {
	let throwLink = req.body.url;
	(async () => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(req.body.url);
		let resultTxt = await page.$eval('#vue-data', e => e.outerHTML);
		let title = await page.title();
		await browser.close();
		await res.render("index", {
			link: throwLink,
			title: title,
			result: resultTxt,
		});
	})();
});