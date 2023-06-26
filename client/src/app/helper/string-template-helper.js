"use strict";
/**
 * https://gist.github.com/bryanerayner/68e1498d4b1b09a30ef6#file-generatetemplatestring-js
 * Produces a function which uses template strings to do simple interpolation from objects.
 *
 * Usage:
 *    var makeMeKing = generateTemplateString('${name} is now the king of ${country}!');
 *
 *    console.log(makeMeKing({ name: 'Bryan', country: 'Scotland'}));
 *    // Logs 'Bryan is now the king of Scotland!'
 */
var StringTemplateHelper = (function () {
    function StringTemplateHelper() {
    }
    StringTemplateHelper.generateTemplate = function (template) {
        var fn = this.cache[template];
        if (!fn) {
            // Replace ${expressions} (etc) with ${map.expressions}.
            var sanitized = template
                .replace(/\$\{([\s]*[^;\s\{]+[\s]*)\}/g, function (_, match) {
                return "${map." + match.trim() + "}";
            })
                .replace(/(\$\{(?!map\.)[^}]+\})/g, '');
            fn = Function('map', "return `" + sanitized + "`");
        }
        return fn;
    };
    StringTemplateHelper.generateString = function (templateStr, data) {
        var template = this.generateTemplate(templateStr);
        return template(data);
    };
    StringTemplateHelper.cache = {};
    return StringTemplateHelper;
}());
exports.StringTemplateHelper = StringTemplateHelper;
//# sourceMappingURL=string-template-helper.js.map