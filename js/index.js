// Book Class: Represents a Book
class Student {
    constructor(fullname, toan, ly,hoa,id,avg = "?") {
      this.fullname = fullname;
      this.toan = toan;
      this.ly = ly;
      this.hoa = hoa;
       this.id =id;
       this.avg = avg;
       
    }

   
  }
  
  // UI Class: Handle UI Tasks
  class UI {
    static displayStudents() {
      const students = Store.getStudets();
      //document.querySelector("#update").setAttribute('class','hide');
      //document.querySelector("#cancel").setAttribute('class','hide');
      // students.forEach(function(studestnts,index){
      //   return UI.addBookToList(students,index);
      // })
      students.forEach((student,index) => UI.addBookToList(student,index));
    }
  
    static addBookToList(student,index) {

      const list = document.querySelector('#student-list');
  
      const row = document.createElement('tr');
     
      row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.fullname}</td>
        <td>${student.toan}</td>
        <td>${student.ly}</td>
        <td>${student.hoa}</td>
        <td>?</td>
        <td style="display:none;">${student.id}</td>
        <td>
        <a href="#"class="btn btn-danger btn-sm delete">X</a>
      
        </td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteStudent(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }



    static calculatorscore(check){
      debugger;
      if(check){
        const students = Store.getStudets();
        students.forEach(function(student,index){
          const list = document.querySelector('#student-list');
          const row = document.createElement('tr');
          let avg = (parseFloat(student.toan) + parseFloat(student.ly) + parseFloat(student.hoa)) / 3;
          var sorce =  Math.round(avg * 10) / 10;
          var flag = true;
           if(sorce >7.5){
             row.setAttribute('class','checked');
           }
          row.innerHTML = `
          <td>${index++}</td>
          <td>${student.fullname}</td>
          <td>${student.toan}</td>
          <td>${student.ly}</td>
          <td>${student.hoa}</td>
          <td>${sorce}</td>
          <td style="display:none;">${student.id}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete">X</a>
          </td>
        `;
    
        list.appendChild(row);
       })
      }else{
        const students = Store.getStudets();
        if(students.length >0){
          students.forEach(function(student,index){
            const list = document.querySelector('#student-list');
            const row = document.createElement('tr');
            let avg = (parseFloat(student.toan) + parseFloat(student.ly) + parseFloat(student.hoa)) / 3;
            var sorce =  Math.round(avg * 10) / 10;
            row.innerHTML = `
            <td>${index++}</td>
            <td>${student.fullname}</td>
            <td>${student.toan}</td>
            <td>${student.ly}</td>
            <td>${student.hoa}</td>
            <td>${sorce}</td>
            <td style="display:none;">${student.id}</td>
            <td>
            <a href="#" class="btn btn-danger btn-sm delete">X</a>
            </td>
            
          `;
      
          list.appendChild(row);
         })
         UI.showAlert('Tính điểm thành công', 'success');
        }else{
          UI.showAlert('Không có học sinh', 'danger');
        }
     
      
      }
      

    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#fullname').value = '';
      document.querySelector('#toan').value = '';
      document.querySelector('#ly').value = '';
      document.querySelector('#hoa').value = '';
    }


    static getEditStudent(id) {
    // const fullname = document.querySelector('#fullname').value;
    //   const toan = parseInt(document.querySelector('#toan').value);
    //   const ly = parseInt(document.querySelector('#ly').value);
    //   const hoa = parseInt(document.querySelector('#hoa').value);

    document.querySelector("#submit").setAttribute('class','hide');
    document.querySelector("#update").setAttribute('class','show');
    document.querySelector("#cancel").setAttribute('class','show');
      const students = Store.getStudets();
      students.forEach(function(student, index) {
          if (student.id === parseInt(id)) {
            console.log(student,11);
            document.querySelector('#fullname').value = student.fullname;
            document.querySelector('#toan').value = student.toan;
            document.querySelector('#ly').value = student.ly;
            document.querySelector('#hoa').value = student.hoa;
            // toan = student.toan;
            // ly = student.ly;
            // hoa = student.hoa
          }
      })


  }
}
  
  // Store Class: Handles Storage
  class Store {
    static getStudets() {
      let students;
      if(localStorage.getItem('students') === null) {
        students = [];
      } else {
        students = JSON.parse(localStorage.getItem('students'));
      }
  
      return students;
    }
  
    static addStudent(student) {
      const students= Store.getStudets();
      students.push(student);
      localStorage.setItem('students', JSON.stringify(students));
    }
  
    static removeStudent(id) {
      const students= Store.getStudets();
      students.forEach((student, index) => {
        if(student.id === parseInt(id)) {
          students.splice(index, 1);
        }
      });
  
      localStorage.setItem('students', JSON.stringify(students));
    }
    updateBooks(id) {
      const fullname = document.querySelector('#fullname').value;
      const toan = parseInt(document.querySelector('#toan').value);
      const ly = parseInt(document.querySelector('#ly').value);
      const hoa = parseInt(document.querySelector('#hoa').value);
      const students = Store.getStudets();
      students.forEach(function(student) {
          if (student.id === parseInt(id)) {
            student.fullname = fullname;
            student.toan = toan;
            student.ly = ly;
            student.hoa = hoa;
          }
      })
      localStorage.setItem('students', JSON.stringify(students));
  }



  }


  
  // Event: Display Books
  document.addEventListener('DOMContentLoaded', UI.displayStudents);
  
 
  // Event: Add a Book
  document.querySelector('#book-form').addEventListener('submit', (e) => {
    debugger;
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const fullname = document.querySelector('#fullname').value;
    const toan = parseInt(document.querySelector('#toan').value);
    const ly = parseInt(document.querySelector('#ly').value);
    const hoa = parseInt(document.querySelector('#hoa').value);
    // Validate
    if(fullname === '' || toan === '' || ly === '' || hoa === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    }
    else if(!((toan >= 0 && toan <= 10) && (ly >= 0 && ly <= 10) && (hoa >= 0 && hoa <= 10)))
    {
      UI.showAlert('Điểm phải từ 0 đến 10', 'danger');
    }	
     else {
    
      const book = new Student(fullname, toan, ly,hoa,Date.now());
  
      UI.addBookToList(book);

      Store.addStudent(book);
  

      UI.showAlert('Student Added', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  

  document.querySelector('#student-list').addEventListener('click', (e) => {


    UI.deleteStudent(e.target);

   
    Store.removeStudent(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert('Student Removed', 'success');
  });

 

  document.querySelector('#cal').addEventListener('click', (e) => {
    //document.querySelector('#student-list').replaceWith("");
    $("tbody").empty();
      e.preventDefault();
      UI.calculatorscore(false);
  });

  
  document.querySelector('#good').addEventListener('click', (e) => {
    //document.querySelector('#student-list').replaceWith("");
    $("tbody").empty();
     UI.calculatorscore(true);
     e.preventDefault();
   
  });







  