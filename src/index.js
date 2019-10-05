const express = require('express')
const app = express()
const soap = require('soap')
const bodyParser = require('body-parser')
app.use(bodyParser.raw({
    type: function () {
        return true;
    },
    limit: '5mb'
}));
var service = {
    ws: {
        calc: {
            sumar: function (args) {
                var n = 1 * args.a + 1 * args.b;
                return { sumres: n };
            },

            multiplicar: function (args) {
                var n = args.a * args.b;
                return { mulres: n };
            }
        }
    }
};

var xml = require('fs').readFileSync('src/service.wsdl', 'utf8');

app.listen(3000, function () {
    soap.listen(app, '/wsdl', service, xml, function () {
        console.log('server initialized')
    })
})