const simple = document.getElementById("simple");
const aliased = document.getElementById("aliased");

simple.addEventListener("submit", (e) => {
	e.preventDefault();
  
  console.log("Simple!");
});

aliased.addEventListener("submit", (e) => {
	e.preventDefault();
  
  const alias = e.target.elements.alias.value;
  console.log(`Aliased: ${alias}`);
});
