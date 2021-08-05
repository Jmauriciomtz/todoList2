$(document).ready(function(){
    var getAndDisplayAllTasks = function () {
      $.ajax({
        type: 'GET',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=121',
        dataType: 'json',
        success: function (response, textStatus) {
          $('#todo-list').empty(); // removes duplicates on call
          response.tasks.forEach(function (task) {
            $('tbody').append('<tr>' +
            '<td class="round"><input type="checkbox" class="mark-complete taskCheckbox" data-id="' +task.id+ '"' + (task.completed ? 'checked' : '') + '></td>' +
            '<td class="taskContent lead">' + task.content + '</td>' +
            '<td><button class="delete btn btn-danger btn-sm taskDelete " data-id="' +task.id+ '">Delete</button></td>' +
            '<tr>');
          });
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    }
    
    var createTask = function () {
      $.ajax({
        type: 'POST',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=121',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          task: {
            content: $('#new-task-content').val()
          }
        }),
        success: function (response, textStatus) {
          $('#new-task-content').val(''); // clears input field for user
          getAndDisplayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });  
    }
    
    $('#create-task').on('submit', function (e) {
      e.preventDefault();
      createTask();
    });
  
    var deleteTask = function (id) {
      $.ajax({
        type: 'DELETE',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=121',
        success: function (response, textStatus) {
          getAndDisplayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    }
  
    $(document).on('click', '.delete', function () {
      deleteTask($(this).data('id'));
    });
  
    var markTaskComplete = function (id) {
      $.ajax({
        type: 'PUT',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=121',
        dataType: 'json',
        success: function (response, textStatus) {
          getAndDisplayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    }
  
    var markTaskActive = function (id) {
      $.ajax({
        type: 'PUT',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=121',
        dataType: 'json',
        success: function (response, textStatus) {
          getAndDisplayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    }
  
    $(document).on('change', '.mark-complete', function () {
      if (this.checked) {
        markTaskComplete($(this).data('id'));
      } else {
        markTaskActive($(this).data('id'));
      }
    });
  
    getAndDisplayAllTasks(); //updates on page load
  });