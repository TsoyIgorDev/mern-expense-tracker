import { useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper.js'

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<null | string>(null);

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError("");
        // Login API call
    };
    return (
        <AuthLayout>
            <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
                <h3 className='text-xl font-semibold text-black'>Welcome back!</h3>
                <p className='text-xs text-slate-700 mt-1.25 mb-6'>
                    Please enter your detail to log in
                </p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email"
                        placeholder="example@gmail.com"
                        type="text"
                    />

                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="min 8 characters"
                        type="password"
                    />

                    {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

                    <button type="submit" className='btn-primary'>
                        LOGIN
                    </button>

                    <p className='text-[13px] text-slate-800 mt-3'>
                        Don't have an account? {" "}
                        <Link className="font-medium text-primary underline" to="/signup">
                            SignUp
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Login