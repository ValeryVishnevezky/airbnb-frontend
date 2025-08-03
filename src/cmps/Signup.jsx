import { useState } from 'react'
import { useNavigate } from 'react-router'
import { signup } from '../store/actions/user.actions'
// import { ImgUploader } from '../cmps/ImgUploader'
import { userService } from '../services/user'

export function Signup() {
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const navigate = useNavigate()

    async function onSignup(credentials) {
        try {
            await signup(credentials)
            navigate('/stay')
        } catch (err) {
            console.log('Signup: err in signup user', err)
        }
    }

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onSignup(credentials)
    }

    return (
        <form className="signup-form" onSubmit={handleSubmit}>

            <section>
                <span className="required-ast">* </span>
            <   label htmlFor="fullname">fullname</label>
            </section>
            <input
                type="text"
                name="fullname"
                value={credentials.fullname}
                onChange={handleChange}
                required
            />

            <section>
                <span className="required-ast">* </span>
                <label htmlFor="username">Username</label>
            </section>
            <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
            />

            <section>
                <span className="required-ast">* </span>
                <label htmlFor="password">Password</label>
            </section>
            <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
            />
            {/* <ImgUploader onUploaded={onUploaded} /> */}
            <button type='submit' className="cta">Signup</button>
            <button type="button" onClick={ () => navigate('/login')}>Login</button>
        </form>
    )
}