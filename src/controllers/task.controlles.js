 import Task from "../models/task.model.js"
export /**
 * The `getTasks` function is an asynchronous function that retrieves tasks
 * associated with a specific user. It takes in two parameters, `req` and `res`,
 * which represent the request and response objects respectively.
 * 
 * The function attempts to find tasks in the database that belong to the user
 * specified in the request object's `user` property. It uses the `Task` model and
 * the `find` method to perform this operation. The `populate` method is used to
 * populate the `user` field of each task with the corresponding user object.
 * 
 * If the tasks are successfully retrieved, the function sends a JSON response
 * containing the tasks using the `res.json` method. If an error occurs during the
 * retrieval process, the function sends a 500 status code along with a JSON
 * response containing an error message using the `res.status` and `res.json`
 * methods respectively.
 */
const getTasks = async (req, res) => {
    
        try {
            const tasks = await Task.find({user: req.user.id}).populate('user')
            res.json(tasks)
        } catch (error) {
            res.status(500).json({message: error.message})
        }

    
}

 export /**
     * The `createTask` function is an asynchronous function that handles the creation
     * of a new task. It takes in two parameters, `req` and `res`, which represent the
     * request and response objects respectively.
     * 
     * The function first extracts the `title`, `description`, and `date` properties
     * from the request body using object destructuring. It also accesses the `id`
     * property of the `req.user` object, which is assumed to contain the user
     * information.
     * 
     * A new `Task` object is created using the extracted properties, including the
     * `user` property set to the `req.user.id`.
     * 
     * Inside a try-catch block, the `newTask` object is saved to the database using
     * the `save` method. The result of the save operation is stored in the
     * `taskSaved` variable.
     * 
     * If the save operation is successful, the `taskSaved` object is sent as a JSON
     * response using the `res.json` method. Otherwise, if an error occurs, a 500
     * status code is sent along with an error message in JSON format using the
     * `res.status` and `res.json` methods respectively.
     */
    const createTask = async (req, res) => {
    const {title, description, date} = req.body
    const newTask = new Task({title, description, date, user: req.user.id
    })
    try {
        const taskSaved = await newTask.save()
        res.json(taskSaved)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

    
}

export /**
         * This is a JavaScript method named `getTask` that is defined as an asynchronous
         * function. It takes two parameters, `req` and `res`, which represent the request
         * and response objects respectively.
         * 
         * The purpose of this method is to retrieve a task by its ID from the database and
         * send it as a JSON response. It uses the `findById` method of the `Task` model
         * to find the task with the specified ID. The `populate` method is used to
         * populate the `user` field of the task with the corresponding user object.
         * 
         * Inside a try-catch block, the method first awaits the result of the `findById`
         * operation and assigns it to the `taskId` variable. If the task is found, it is
         * sent as a JSON response using the `res.json` method. If the task is not found,
         * a 404 status code is set and a JSON response with a message indicating that the
         * task was not found is sent.
         * 
         * If an error occurs during the execution of the method, a 500 status code is set
         * and a JSON response with the error message is sent.
         */
        const getTask = async (req, res) => {
    try{
        const taskId = await Task.findById(req.params.id).populate('user');
        res.json(taskId);
        if(!taskId) return
        res.status(404).json({message: 'Task not found'})
        res.json(taskId)
} catch (error) {
    res.status(500).json({message: error.message})
    }
    }

    
    export /**
             * The `deleteTask` function is an asynchronous function that handles the deletion
             * of a task. It takes in two parameters, `req` and `res`, which represent the
             * request and response objects respectively.
             * 
             * The function uses the `findByIdAndDelete` method from the `Task` model to find
             * and delete the task with the specified `id` from the request parameters. The
             * result of the deletion operation is stored in the `taskDeleted` variable.
             * 
             * If the `taskDeleted` variable is falsy, indicating that no task was found with
             * the specified `id`, the function returns a JSON response with a status code of
             * 404 and a message stating that the task was not found.
             * 
             * If the `taskDeleted` variable is truthy, indicating that the task was
             * successfully deleted, the function returns a response with a status code of
             * 204, indicating that the request was successful with no content.
             */
            const deleteTask = async (req, res) => {
            const taskDeleted = await Task.findByIdAndDelete(req.params.id)
            if(!taskDeleted) return res.status(404).json({message: 'Task not found'})
            return res.sendStatus(204)
        
    }
    export /**
                 * The `updateTask` method is an asynchronous function that handles the updating of
                 * a task. It takes in two parameters: `req` (request) and `res` (response).
                 * 
                 * The method attempts to update a task by calling the `findByIdAndUpdate` method
                 * on the `Task` model. It uses the `req.params.id` to identify the task to be
                 * updated and `req.body` to provide the updated task data. The `{new: true}`
                 * option ensures that the updated task is returned.
                 * 
                 * If the task is not found, the method returns a 404 status code with a JSON
                 * response containing the message "Task not found".
                 * 
                 * If an error occurs during the update process, the method returns a 500 status
                 * code with a JSON response containing the error message.
                 * 
                 * If the update is successful, the method returns a JSON response with the updated
                 * task data.
                 */
                const updateTask = async (req, res) => {
        try {
            const taskupdate = await Task.findByIdAndUpdate(req.params.id, req.body,
                 {new: true})
            if(!taskupdate) return res.status(404).json({message: 'Task not found'})
            res.json(taskupdate)
        } catch (error) {
            res.status(500).json({message: error.message})
        }


        
    }