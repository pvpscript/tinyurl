const url = "https://tinyurl.com/create.php?source=indexpage&url=www.google.com&alias=tstasd9gfew";

fetch(url).then(r => r.text()).then(result => {
	console.log(result);
});
