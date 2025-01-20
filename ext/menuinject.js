function injectItemsToFile(){
var outerFileMenu = document.getElementsByClassName("menu-bar_menu-bar-item_264qQ")[2];
var fileMenu = document.getElementsByClassName("menu-bar_menu-bar-menu_3M6v8")[0];
var editMenu = document.getElementsByClassName("menu-bar_menu-bar-menu_3M6v8")[1];
var menulist = document.getElementsByClassName("menu_menu_1rWB9")[0];
var item = document.getElementById("loadprojbyid");
if(menulist !== undefined && item == undefined){
//var lastItem = document.getElementsByClassName("menu_menu-item_3ELPx")[2];
//lastItem.classList.add("menu_menu-section_1ai_E");
var el = document.createElement("li");
el.classList.add("menu_menu-item_3ELPx");
el.classList.add("menu_menu-section_1ai_E");
el.setAttribute("id","loadprojbyid");
el.innerHTML = "<span>Load Project by ID</span>";
el.onclick = function(){
  var a = document.createElement('a');
  a.setAttribute('href','#'+prompt('Project id? (for example, in scratch.mit.edu/projects/123456 , 123456 would be the id)'));
  a.click();
}
menulist.appendChild(el);
}
}

function injectItemsToEdit(){
var outerFileMenu = document.getElementsByClassName("menu-bar_menu-bar-item_264qQ")[3];
var fileMenu = document.getElementsByClassName("menu-bar_menu-bar-menu_3M6v8")[0];
var editMenu = document.getElementsByClassName("menu-bar_menu-bar-menu_3M6v8")[1];
var menulist = document.getElementsByClassName("menu_menu_1rWB9")[0];
var item = document.getElementById("devitem");
if(menulist !== undefined && item == undefined){
var el = document.createElement("li");
el.classList.add("menu_menu-item_3ELPx");
el.classList.add("menu_menu-section_1ai_E");
el.setAttribute("id","devitem");
el.innerHTML = "<span>Developers</span>";
el.onclick = function(){
  window.open('https://github.com/powerbox1000/dev-blocks/wiki/Developers');
}
menulist.appendChild(el);
}
}

var outerEditMenu = document.getElementsByClassName("menu-bar_menu-bar-item_264qQ")[3];
outerEditMenu.addEventListener("click",injectItemsToEdit);

var outerFileMenu = document.getElementsByClassName("menu-bar_menu-bar-item_264qQ")[2];
outerFileMenu.addEventListener("click",injectItemsToFile);