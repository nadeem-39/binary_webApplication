const Joi = require('joi');

module.exports.memberSchemaValidateFunct = Joi.object({
    members: Joi.object({
        name: Joi.string().required(),
        image:Joi.string().allow("",null),
        year: Joi.number().required(),
        post: Joi.string().required(),
        branch: Joi.string().required(),
        skills: Joi.string().required(),
        email:Joi.string().required(),

    }).required(),
})




module.exports.eventSchemaValidateFunct = Joi.object({
    events: Joi.object({
        type: Joi.string().required(),
        title: Joi.string().required(),
        image:Joi.string().allow("",null),
        date: Joi.string().required(),
        description: Joi.string().required(),
        participants: Joi.number().required(),
        winner: Joi.string().allow("", null),
        includedYear: Joi.string().required(),
        includedBranch:Joi.string().required(),
        venue : Joi.string().required(),

    }).required(),
})