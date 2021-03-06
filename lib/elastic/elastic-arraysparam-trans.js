var util = require('util');
var Transform = require('stream').Transform;
var _ = require('lodash');
var log = require('debug');

// Enable debugging
log.enable('stringarray-trans:info');

var info = log('stringarray-trans:info');
var debug = log('stringarray-trans:debug');

function ElasticArraysparamTrans(size)
{
  Transform.call(this, {objectMode: true});
  this.size = size;
  this.docBuffer = [];
}

util.inherits(ElasticArraysparamTrans, Transform);

ElasticArraysparamTrans.prototype._transform = function transformStringArray(data, encoding, callback) {
  // store the data into docBuffer, if equal to this.size, then push it
  this.docBuffer.push(data);
  if (this.docBuffer.length === this.size) {
    this.push(this.docBuffer);
    this.docBuffer = [];
  }
  callback();
};

ElasticArraysparamTrans.prototype._flush = function flushStringArray(callback) {
  //push the remaining data from docBuffer
  //remove docBuffer's undefined elements, then push it.
  var lastBuffer = _.filter(this.docBuffer, function(element) {
    return !(typeof element === 'undefined');
  })
  this.push(lastBuffer);
  callback();
};

module.exports = ElasticArraysparamTrans;
