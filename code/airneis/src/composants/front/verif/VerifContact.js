import Joi from "joi";

export const commandeVerif = Joi.object({
     nom : Joi.string()
          .min(1)
          .max(20)
          .regex(/^[^<>]*$/)
          .required()
          .messages({
               "string.min" : "le champ nom doit contenir au minimum 1 lettre",
               "string.max" : "le champ nom ne peut contenir au maximum que 20 lettres",
          }),

     email : Joi.string()
          .min(4)
          .max(255)
          .email({ tlds: { allow: false } })
          .required()
          .messages({
               "string.min" : "le champ email doit contenir au minimum 4 lettres",
               "string.email" : "le format de l'email n'est pas valide"
          }),

     message : Joi.string()
          .min(4)
          .max(1000)
          .regex(/^[^<>]*$/)
          .required()
          .messages({
               "string.pattern.base" : "le champ message ne peut pas contenir les caractères suivants : < >"
          })
})