
function fix(context) {
    var pluginPath = context.plugin.url().path()
    var shell1 = "/usr/sbin/spctl --master-disable"
    var shell2 = "/usr/bin/xattr -rc " + pluginPath
    var script1 = "do shell script \"" + shell1 + "\"  with administrator privileges"
    var script2 = "do shell script \"" + shell2 + "\"  with administrator privileges"
    var appleScript1 = [[NSAppleScript alloc] initWithSource: script1];
    var dict1 = nil
    var dict2 = nil
    [appleScript1 executeAndReturnError: dict1];
    var appleScript2 = [[NSAppleScript alloc] initWithSource: script2];
    [appleScript2 executeAndReturnError: dict2];
    log(dict1)
    log(dict2)
}
