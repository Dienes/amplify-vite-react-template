import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  MailingAddress: a.customType({
    number: a.string().required(),
    streetAddress: a.string().required(),
    apartmentNumber: a.string(),
    city: a.string().required(),
    state: a.string(),
    zipcode: a.integer(),
  }),

  Company: a.model({
    company: a.string().required(),
    patientPhoneNumber: a.phone(),
    providerPhoneNumber: a.phone(),
    faxNumber: a.phone(),
    providerPortal: a.url(),
    address: a.ref('MailingAddress'),
    // medical guidelines pdf?
  })
  .authorization(allow => [allow.authenticated()]),

  InsuranceCoverage: a.customType({
    company: a.ref('Company').required(),
    planName: a.string().required(),
    memberID: a.string().required(),
    groupNumber: a.string(),
    startDate: a.date(),
    endDate: a.date(),
    cardScanFiles: a.string().array(),
  }),

  Doctor: a.model({
    name: a.string().required(),
    address: a.ref('Address'),
    phoneNumber: a.phone(),
    faxNumber: a.phone(),
  })
  .authorization(allow => [allow.authenticated()]),

  Todo: a
    .model({
      content: a.string(),
      isDone: a.boolean(),
    })
  .authorization(allow => [allow.owner()]),
  Patient: a
    .model({
      lastName: a.string(),
      firstName: a.string(), // preferred name
      legalName: a.string(), // if different from preferred name
      pronouns: a.string(),
      sex: a.string(),
      legalSex: a.string(), // if different
      phoneNumber: a.phone(),
      email: a.email(),
      address: a.string(),
      birthDate: a.date(),
      licenseScanFiles: a.string().array(),
      treatmentArea: a.string(),
      useInsurance: a.boolean(),
      insurancePlans: a.ref('InsuranceCoverage').array(),
      pcp: a.ref('Doctor'),
      hasPCPLetter: a.boolean(),
      pcpLetterScanFile: a.string(),
      therapist: a.ref('Doctor'),
      hasTherapistLetter: a.boolean(),
      therapistLetterScanFile: a.string(),
      seenSurgeon: a.boolean(),
      surgeon: a.ref('Doctor'),
      surgeryDate: a.date(),
      // medical info for insurance
      socialTransitionTime: a.string(),
      hormoneInfo: a.string(),
      timeWithPCP: a.string(),
      intakeFormDone: a.boolean(),
      intakeFormFile: a.string(),
      releaseOfInformationDone: a.boolean(),
      releaseScanFile: a.string(),
      mnpoeDone: a.boolean(),
      mnpoeScanFile: a.string(),
    })
  .authorization(allow => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    //defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    //apiKeyAuthorizationMode: {
    //  expiresInDays: 30,
    //},
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
