function Student(firstName, lastName){
  this.firstName = firstName;
  this.lastName = lastName;
  this.courses = [];
}

Student.prototype.name = function(){
  return `${this.firstName} ${this.lastName}`;
};


Student.prototype.hasConflict = function(other_course){
  this.courses.forEach(function(course){
    if (other_course.conflictsWith(course)) return true;
  });
  return false;
};

Student.prototype.enroll = function(course){
  if (this.hasConflict(course)) throw "conflict";
  if (!(this.courses.includes(course))){
    course.students.push(this);
    this.courses.push(course);
  }
};

Student.prototype.courseLoad = function(){
  let deptHash = {};
  this.courses.forEach(function(course){
    if (deptHash[course.department] === undefined) {
      deptHash[course.department] = course.credits;
    } else{
      deptHash[course.department] += course.credits;
    }
  });
  return deptHash;
};


function Course(name, department, credits, days, timeBlock) {
  this.days = days;
  this.timeBlock = timeBlock;
  this.name = name;
  this.department = department;
  this.credits = credits;
  this.students = [];
}

Course.prototype.addStudent = function(student) {
  student.enroll(this);
};

Course.prototype.conflictsWith = function(course) {
  if (course.timeBlock !== this.timeBlock) return false;
  this.days.forEach(function(day){
    if (course.days.includes(day)) return true;
  });
  return false;
};


const course1 = new Course("Computer Science 101", "Compsci", 3, ["mon", "wed", "fri"], 1 );
const course2 = new Course("Computer Science 102", "Compsci", 1, ["mon", "wed", "fri"], 2);

const s1 = new Student("Sam", "Manning");
const s2 = new Student("Sunny", "Rekhi");
s2.enroll(course1);
s2.enroll(course2);
