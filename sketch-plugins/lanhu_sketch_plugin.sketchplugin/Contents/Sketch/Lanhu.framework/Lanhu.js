/*
// To load this framework, replace the onRun method in your script.cocoscript

@import 'Lanhu.framework/Lanhu.js'

var onRun = function(context) {
   var obj = Lanhu.alloc().init()
   var uppercase = obj.uppercaseString("hello world")

   log(uppercase);
   context.document.showMessage(uppercase);
}
*/

var Lanhu_FrameworkPath = Lanhu_FrameworkPath || COScript.currentCOScript().env().scriptURL.path().stringByDeletingLastPathComponent();
var Lanhu_Log = Lanhu_Log || log;
(function () {
    var mocha = Mocha.sharedRuntime();
    var frameworkName = "Lanhu";
    var directory = Lanhu_FrameworkPath;
    var url = directory + "/" + frameworkName + ".framework"
    // NSBundle.bundleWithPath(url).unload()
    // NSBundle.bundleWithPath(url).load()
    [mocha loadFrameworkWithName: frameworkName inDirectory: directory]
    // if (mocha.valueForKey(frameworkName)) {
    //     Lanhu_Log("😎 loadFramework: `" + frameworkName + "` already loaded.");
    //     return true;
    // } else if ([mocha loadFrameworkWithName: frameworkName inDirectory: directory]) {
    //     Lanhu_Log("✅ loadFramework: `" + frameworkName + "` success!");
    //     mocha.setValue_forKey_(true, frameworkName);
    //     return true;
    // } else {
    //     Lanhu_Log("❌ loadFramework: `" + frameworkName + "` failed!: " + directory + ". Please define Lanhu_FrameworkPath if you're trying to @import in a custom plugin");
    //     return false;
    // }
})();
