const simple = document.getElementById("simple");
const aliased = document.getElementById("aliased");

function sendMessage(option, alias) {
	chrome.runtime.sendMessage({
		option: option,
		alias: alias
	});
}

simple.addEventListener("submit", (e) => {
  e.preventDefault();
  
  sendMessage("simple");
});

aliased.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const alias = e.target.elements.alias.value;
  sendMessage("aliased", alias);
});
