var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , _ = require("underscore")
  , validate = require('mongoose-validator').validate
  , uuid = require('node-uuid')
  , massAssign = require('mongoose-mass-assign');

var lengthValidator = validate('len', 3, 15);

var TalkSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: lengthValidator
  },
  speaker: {
    type: String,
    required: true,
    validate: lengthValidator
  },
  url: {
    type: String,
    required: true,
    validate: [lengthValidator, validate('isUrl')]
  },
  description: {
    type: String,
    required: true,
    validate: lengthValidator
  },
  uuid: {
    type: String,
  }
});

TalkSchema.pre('save', function(next) {
  this.uuid = uuid.v1();
  next();
});

TalkSchema.plugin(massAssign);

mongoose.model('Talk', TalkSchema);
