import Joi from "joi";

export const commandeVerif = Joi.object({
     nomAdresseLivraison : Joi.string()
          .min(1)
          .max(22)
          .regex(/^[^<>?:!;,/§$£€]*$/)
          .required()
          .messages({
               "string.min" : "le champ nom de l'adresse doit contenir au minimum 1 lettre",
               "string.max" : "le champ nom de l'adresse ne peut contenir au maximum que 20 lettres",
               "string.pattern.base" : "le champ nom de l'adresse ne peut contenir de caractères spéciaux",
          }),

     nomLivraison : Joi.string()
          .min(1)
          .max(22)
          .regex(/^[^<>?:!;,/§$£€]*$/)
          .required()
          .messages({
               "string.min" : "le champ nom doit contenir au minimum 1 lettre",
               "string.max" : "le champ nom ne peut contenir au maximum que 20 lettres",
               "string.pattern.base" : "le champ nom ne peut contenir de caractères spéciaux",
          }),

     prenomLivraison : Joi.string()
          .min(1)
          .max(22)
          .regex(/^[^<>?:!;,/§$£€]*$/)
          .required()
          .messages({
               "string.min" : "le champ prenom doit contenir au minimum 1 lettre",
               "string.max" : "le champ prenom ne peut contenir au maximum que 20 lettres",
               "string.pattern.base" : "le champ prenom ne peut contenir de caractères spéciaux",
          }),

     adresseLivraison : Joi.string()
          .min(1)
          .max(102)
          .regex(/^[^<>?:!;,/§$£€]*$/)
          .required()
          .messages({
               "string.min" : "le champ adresse doit contenir au minimum 1 lettre",
               "string.max" : "le champ adresse ne peut contenir au maximum que 100 lettres",
               "string.pattern.base" : "le champ adresse ne peut contenir de caractères spéciaux",
          }),

     adresse2Livraison : Joi.string()
          .min(1)
          .max(102)
          .regex(/^[^<>?:!;,/§$£€]*$/)
          .messages({
               "string.min" : "le champ adresse doit contenir au minimum 1 lettre",
               "string.max" : "le champ adresse ne peut contenir au maximum que 100 lettres",
               "string.pattern.base" : "le champ adresse n°2 ne peut contenir de caractères spéciaux",
          }),

     codePostalLivraison : Joi.string()
          .min(1)
          .max(7)
          .regex(/^\d+$/)
          .required()
          .messages({
               "string.min" : "le champ code postal doit contenir au minimum 1 lettre",
               "string.max" : "le champ code postal ne peut contenir au maximum que 100 lettres",
               "string.pattern.base": "Le champ code postal ne peut contenir que des chiffres",
          }),

     villeLivraison : Joi.string()
          .min(1)
          .max(52)
          .regex(/^[^<>?:!;,/§$£€]*$/)
          .messages({
               "string.min" : "le champ ville doit contenir au minimum 1 lettre",
               "string.max" : "le champ ville ne peut contenir au maximum que 100 lettres",
               "string.pattern.base" : "le champ ville ne peut contenir de caractères spéciaux",
          }),
     
     paysLivraison : Joi.string()
          .min(1)
          .max(52)
          .regex(/^[^<>?:!;,/§$£€]*$/)
          .messages({
               "string.min" : "le champ pays doit contenir au minimum 1 lettre",
               "string.max" : "le champ pays ne peut contenir au maximum que 100 lettres",
               "string.pattern.base" : "le champ pays ne peut contenir de caractères spéciaux",
          }),


     datePaiement: Joi.string()
          .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)
          .required()
          .messages({
            "string.pattern.base": "Le champ date doit être au format MM/YY (par exemple, 07/22)",
            "any.required": "Le champ date est requis",
          }),
        
})