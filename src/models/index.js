// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Campaign } = initSchema(schema);

export {
  User,
  Campaign
};