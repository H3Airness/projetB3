import Joi from "joi";

export const commandeVerif = Joi.object({
     nomAdresse : Joi.string()
          .min(1)
          .max(20)
          .regex(/^[^<>]*$/)
          .required()
          .messages({
               "string.min" : "le champ nom de l'adresse doit contenir au minimum 1 lettre",
               "string.max" : "le champ nom de l'adresse ne peut contenir au maximum que 20 lettres",
          }),

     nom : Joi.string()
          .min(1)
          .max(20)
          .regex(/^[^<>]*$/)
          .required()
          .messages({
               "string.min" : "le champ nom doit contenir au minimum 1 lettre",
               "string.max" : "le champ nom ne peut contenir au maximum que 20 lettres",
          }),

     prenom : Joi.string()
          .min(1)
          .max(20)
          .regex(/^[^<>]*$/)
          .required()
          .messages({
               "string.min" : "le champ prenom doit contenir au minimum 1 lettre",
               "string.max" : "le champ prenom ne peut contenir au maximum que 20 lettres",
          }),
})