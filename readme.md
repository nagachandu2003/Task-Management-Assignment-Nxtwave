Logs :
![image](https://github.com/user-attachments/assets/5cde9524-b885-44ed-b0b8-e03188605c25)


Assignment: Build a Simple REST API
Objective:
Your task is to develop a RESTful API using Node.js and Express.js. The API will manage a simple collection of tasks, allowing users to create, read, update, and delete (CRUD) tasks via API endpoints. The API should return JSON responses and handle common HTTP methods (GET, POST, PUT, DELETE).

Requirements:
Core Features:
Create a Task (POST /tasks)

Accepts a task title and description.
Assigns a unique ID to each task.
Returns the created task as a response.
Get All Tasks (GET /tasks)

Returns a list of all tasks in JSON format.
Get a Single Task (GET /tasks/:id)

Returns details of a specific task by ID.
Returns a 404 error if the task is not found.
Update a Task (PUT /tasks/:id)

Allows updating a task's title or description.
Returns the updated task as a response.
Delete a Task (DELETE /tasks/:id)

Deletes a task from the list.
Returns a success message.
