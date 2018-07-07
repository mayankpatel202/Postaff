const db = require('../indexDb.js');
const { School } = require('./schoolSchema');
const { Sub } = require('./subSchema');
const faker = require('faker');

// have created a completed_by and claimed-by property in this schema

const Job = db.sequelize.define('job', {
  description: db.sequelize.Sequelize.TEXT,
  schoolName: db.sequelize.Sequelize.STRING,
  start_time: db.sequelize.Sequelize.TIME,
  end_time: db.sequelize.Sequelize.TIME,
  start_date: db.sequelize.Sequelize.DATEONLY,
  end_date: db.sequelize.Sequelize.DATEONLY,
  subject: db.sequelize.Sequelize.STRING,
  grade: db.sequelize.Sequelize.STRING,
  notes: db.sequelize.Sequelize.TEXT,
  attachments: db.sequelize.Sequelize.BLOB,
  rate: db.sequelize.Sequelize.INTEGER,
  approved: db.sequelize.Sequelize.BOOLEAN,
  claimed: db.sequelize.Sequelize.BOOLEAN,
  complete: db.sequelize.Sequelize.BOOLEAN,
  hours_submitted: db.sequelize.Sequelize.BOOLEAN,
  hours_completed: db.sequelize.Sequelize.INTEGER,
  hours_approved: db.sequelize.Sequelize.BOOLEAN,
  school_rating: db.sequelize.Sequelize.INTEGER,
  sub_rating: db.sequelize.Sequelize.INTEGER,
  paid: db.sequelize.Sequelize.BOOLEAN,
});

School.hasMany(Job, { foreignKey: 'fk_school' });
Job.belongsTo(School, { foreignKey: 'fk_school' });

Sub.hasMany(Job, {foreignKey: 'fk_sub'});
Job.belongsTo(Sub, {foreignKey: 'fk_sub'});

// const now = new Date();
// const future = new Date();
// const startDate = new Date(future.setDate(future.getDate() + 2));

// const endDate = new Date(future.setDate(future.getDate() + 30));
// const date2 = new Date(future.setDate(future.getDate() + 25));
// const date3 = new Date(future.setDate(future.getDate() + 20));
// const date4 = new Date(future.setDate(future.getDate() + 10));
// const date5 = new Date(future.setDate(future.getDate() + 5));

/**
 *  UNCOMMENT THE FOLLOWING TO GENERATE SAMPLE DATA
 */
// Job.create({
//   description: 'looking for history sub',
//   fk_school: 1,
//   fk_sub: 3,
//   start_date: startDate,
//   end_date: date2,
//   subject: 'History',
//   grade: 8,
//   claimed: true,
//   approved: true,
//   complete: false,
// });
// Job.create({
//   description: 'looking for math sub',
//   fk_school: 2,
//   start_date: date5,
//   end_date: date3,
//   subject: 'Math',
//   grade: 7,
//   claimed: false,
//   approved: false,
//   complete: false,
// });
// Job.create({
//   description: 'looking for science sub',
//   fk_school: 1,
//   start_date: date3,
//   end_date: endDate,
//   subject: 'Science',
//   grade: 9,
//   claimed: false,
//   approved: false,
//   complete: false,
// });
// Job.create({
//   description: 'looking for pe sub',
//   fk_school: 2,
//   fk_sub: 1,
//   start_date: startDate,
//   end_date: date5,
//   subject: 'PE',
//   grade: 6,
//   claimed: true,
//   approved: true,
//   complete: true,
// });
// Job.create({
//   description: 'looking for computer sub',
//   fk_school: 3,
//   fk_sub: 1,
//   claimed: true,
//   approved: false,
//   complete: false,
//   start_date: date4,
//   end_date: date3,
//   subject: 'Computer',
//   grade: 5,
// });
// Job.create({
//   description: 'coding class sub needed',
//   fk_school: 3,
//   fk_sub: 2,
//   claimed: true,
//   approved: false,
//   complete: false,
//   start_date: startDate,
//   end_date: endDate,
//   subject: 'Coding',
//   grade: 5,
// });


/**
 *  this following are based on old schema,
 *  whoever made this, please update it following the above format
 */
// Job.create({
//   description: 'looking for English sub',
//   School_id: 4,
//   start_date: startDate,
//   end_date: endDate,
//   subject: 'English',
//   grade: 7,
//   approved: false,
//   claimed: true,
//   claimed_by: 1,
// });
// Job.create({
//   description: 'looking for Chemistry sub',
//   School_id: 4,
//   start_time: startTime,
//   end_time: endTime,
//   start_date: startDate,
//   end_date: endDate,
//   subject: 'Chemistry',
//   grade: 7,
//   approved: false,
//   claimed: true,
//   claimed_by: 1,
// });

Job.sync();

// var generateRandomData = function() {
//   var subjects = ['English', 'Literature', 'Math', 'Geography', 'History', 'Social Studies', 'Science', 'Art', 'Music'];

//   for (var i = 0; i < 25; i++) {

//     var claimed = faker.random.boolean();
//     var approved = claimed ? faker.random.boolean() : false;
//     var complete = approved ? faker.random.boolean() : false;
//     var subject = subjects[Math.floor(Math.random() * 8) + 1];
//     var grade = Math.floor(Math.random() * 12) + 1;
//     var startDate = faker.date.future();

//     Job.create({
//       description: subject + ' Substitute Teacher Needed for Grade ' + grade,
//       claimed: claimed,
//       approved: approved,
//       complete: complete,
//       start_date: startDate,
//       end_date: startDate,
//       subject: subject,
//       grade: grade,
//       fk_school: Math.floor(Math.random() * 10) + 1,
//       fk_sub: null,
//     })
//   }
// }

// generateRandomData();

module.exports.Job = Job;
