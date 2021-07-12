import { User } from './models/User';

const user = new User({ name: 'Tommy Lee', age: 62 });

user.on('save', () => console.log('User saved'));
user.on('error', () => console.log('User could not be saved.'));

user.save();
