var Lanhu_FrameworkPath = Lanhu_FrameworkPath || COScript.currentCOScript().env().scriptURL.path().stringByDeletingLastPathComponent();
var mocha = Mocha.sharedRuntime();
var frameworkName = "Lanhu";
var directory = Lanhu_FrameworkPath;
var url = directory + "/" + frameworkName + ".framework"
var xattr = "/usr/bin/xattr"
var args = ["-r", "-d", "com.apple.quarantine", url];
var task = NSTask.launchedTaskWithLaunchPath_arguments(xattr,args);
task.waitUntilExit();

@import 'Lanhu.framework/Lanhu.js'

function all(context) {
    onRun(context, true);
}

function select(context) {
    onRun(context, false);
}

function clean(context) {
    var obj = Lanhu.alloc().init()
    obj.clean(context);
}

function archive(context) {
    var obj = Lanhu.alloc().init()
    obj.archive(context);
}


function reset(context) {
    var obj = Lanhu.alloc().init()
    obj.reset(context);
}

function diffDesgin(context) {
    let obj = Lanhu.alloc().init()
    obj.diffDesgin_isEnterprise(context,false)
}

function diffDesginHelp(context) {
    let obj = Lanhu.alloc().init()
    obj.diffDesginHelper_isEnterprise(context,false)
}

var onRun = function (context, isAll) {
    var obj = Lanhu.alloc().init()
    if (isAll) {
        obj.all_isEnterprise(context, false);
    } else {
        obj.select_isEnterprise(context, false);
    }
}

var onStartup = function (context) {

}

var onOpenDocument = function (context) {
    var obj = Lanhu.alloc().init()
    obj.checkUpdateWithContext(context)
}

var onSelectionChanged = function (context) {

}
