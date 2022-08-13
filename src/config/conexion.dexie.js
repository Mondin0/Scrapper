import profileSchema from '../models/profile'
import Dexie from 'dexie'

export const db = new Dexie('myDatabase');

db.version(1).stores({
    urlCandidato: '++id, urls',
});
db.version(1).stores({
    profiles: '++id, '+Object.keys(profileSchema.params).join(', ')
});

