import Joi from "joi";

export const verifPaiement = Joi.object({

     nomPaiement : Joi.string()
          .min(1)
          .max(32)
          .regex(/^[^<>?:!;,/§$£€]*$/)
          .required()
          .messages({
               "string.min" : "le champ nom doit contenir au minimum 1 lettre",
               "string.max" : "le champ nom ne peut contenir au maximum que 30 lettres",
               "string.pattern.base" : "le champ nom ne peut contenir de caractères spéciaux",
          }),

     numeroPaiement : Joi.string()
          .min(18)
          .max(18)
          .regex(/^[^<>?:!;,/§$£€]*$/)
          .required()
          .messages({
               "string.min" : "le champ numéro carte doit contenir au minimum 16 chiffres",
               "string.max" : "le champ numéro carte ne peut contenir au maximum que 16 chiffres",
               "string.pattern.base" : "le champ numéro carte ne peut contenir que des chiffres",
          }),

     datePaiement: Joi.string()
          .regex(/^[^<>?:!;,§$£€azertyuiopqsdfghjklmwxcvbn]*$/)
          .required()
          .messages({
            "string.pattern.base": "Le champ date doit être au format MM/YY (par exemple, 07/22) et ne peut contenir que des chiffres",
            "any.required": "Le champ date est requis",
          }),

     cvvPaiement : Joi.string()
          .min(5)
          .max(5)
          .regex(/^[^<>?:!;,/§$£€azertyuiopqsdfghjklmwxcvbn]*$/)
          .required()
          .messages({
               "string.min" : "le champ cvv doit contenir au minimum 3 chiffres",
               "string.max" : "le champ cvv ne peut contenir au maximum que 3 chiffres",
               "string.pattern.base": "Le champ cvv ne peut contenir que des chiffres",
          }),
        
})