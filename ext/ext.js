class DevBlocksError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "DevBlocks error";
  }
}
function urlOptionValue(name, defaultValue) {
  var matches = window.location.href.match(new RegExp("[?&]".concat(name, "=([^&]*)&?")));
  return matches ? matches[1] : defaultValue;
}
function importExtensionFromURL(url){
  if(window.vm){
    try{
      vm.extensionManager.loadExtensionURL(url);
    }catch(e){
      throw new DevBlocksError("Error loading extension from URL: " + url);
      console.info('the error is below');
      console.groupCollapsed();
      console.error(e);
      console.groupEnd();
    }
  }else{
    throw new DevBlocksError("VM not found; failed to load extension: " + url);
  }
}
function importExtensionFromJS(js){
  importExtensionFromURL("data:applictaion/javascript;charset=UTF-8," + escape(js));
}