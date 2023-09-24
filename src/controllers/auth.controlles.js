import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'


export /**
 * The `register` method is an asynchronous function that handles the registration
 * process for a user. It takes in the `req` (request) and `res` (response)
 * objects as parameters.
 * 
 * The method extracts the `email`, `password`, and `username` from the request
 * body using destructuring.
 * 
 * Inside a try-catch block, the method hashes the password using bcrypt with a
 * salt factor of 10. It then creates a new instance of the User model with the
 * extracted email, hashed password, and username.
 * 
 * The new user is saved to the database using the `save` method, and the saved
 * user object is stored in the `userSaved` variable.
 * 
 * An access token is created using the `createAccessToken` function, passing the
 * user's ID as a parameter.
 * 
 * The access token is then set as a cookie in the response using `res.cookie`.
 * 
 * Finally, the method sends a JSON response with the user's ID, username, email,
 * createdAt, and updatedAt properties.
 * 
 * If any error occurs during the registration process, a 500 status code is sent
 * in the response along with an error message.
 */
const register = async (req, res) => {
    const { email, password, username } = req.body

    try {
        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            email,
            password: passwordHash,
            username
        })

        const userSaved = await newUser.save()
        const token = await createAccessToken({id:userSaved._id})
            res.cookie('token'
            , token)   
        res.json({
            _id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        }) 
    } catch (error) {
        res.status(500).json({message: error.message}) 

    }
}


export /**
     * The `login` method is an asynchronous function that handles a login request. It
     * takes in two parameters, `req` and `res`, which represent the request and
     * response objects respectively.
     * 
     * This method sends a response with the string `'login'`.
     */
const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const userFound = await User.findOne({email})

        if(!userFound)
            return res.status(400).json({message: 'User not found'})

            const isMatch = await bcrypt.compare(password, userFound.password)

            if(!isMatch)
                return res.status(400).json({message: 'Incorrect password'})

            const token = await createAccessToken({id:userFound._id})
            res.cookie('token'
            , token)   
            res.json({
            _id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        }) 
    } catch (error) {
        res.status(500).json({message: error.message}) 

    }
}

export /**
     * The `logout` method is an asynchronous function that handles a logout request. It
     * takes in two parameters, `req` and `res`, which represent the request and
     * response objects respectively.
     * 
     * This method sends a response with the string `'logout'`.
     */

const logout =  (req, res) => {

        res.cookie('token', "", {
            httpOnly: true,
            expires: new Date(0)
        })
        return res.sendStatus(200)

   
}
 
export /**
     * The `profile` method is an asynchronous function that handles a profile request. It
     * takes in two parameters, `req` and `res`, which represent the request and
     * response objects respectively.
     * 
     * This method sends a response with the string `'profile'`.
     */
const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    
    if(!userFound)return res.status(400).json({message: 'User not found'})
    return res.json({
        _id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })

}





