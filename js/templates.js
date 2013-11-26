/* Cache compiled templates by ID */
Handlebars.templates = {};
$.tmpl = function(id, context) {
    var template = null;
    if (!(id in Handlebars.templates)) {
        template = Handlebars.templates[id] = Handlebars.compile($('#'+id+'-template').html());
    } else {
        template = Handlebars.templates[id];
    }
    return context ? template(context) : template;
};

/* Allow access to global variables */
Handlebars.registerHelper('global', function(key) {
    return window[key];
});

Handlebars.registerHelper('formatDate', function(date) {
    return (new Date(date)).toDateString();
});

Handlebars.registerHelper('one', function(context, options) {
    if (context && context.hasOwnProperty('length') && context.length == 1) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('escapeMessage', function(msg) {
  msg = Handlebars.Utils.escapeExpression(msg);
  msg = msg.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br/>$2');
  var exp = /(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/ig;
  msg = msg.replace(exp, "<a href='$1' target='_blank'>$1</a>");
  return new Handlebars.SafeString(msg);
});
