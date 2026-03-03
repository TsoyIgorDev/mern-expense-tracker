import { useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper.js'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector.js';

const SignUp = () => {
    const [profilePic, setProfilePic] = useState<string | File | null>(null);
    const [fullName, setFullName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [error, setError] = useState<null | string>(null);
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!fullName) {
            setError("Please enter full name");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError("");
        // SignUp API call

    }
    return (
        <AuthLayout>
            <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
                <h3 className='text-xl font-semibold text-theme-primary'>Create an account</h3>
                <p className='text-xs text-theme-secondary mt-[5px] mb-6'>Join us today by entering your details below</p>

                <form onSubmit={handleSignUp}>
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Input
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                            label='Full Name'
                            placeholder='Igor'
                            type='text'
                        />
                        <Input
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            label="Email"
                            placeholder="example@gmail.com"
                            type="text"
                        />

                        <div className='col-span-2'>
                            <Input
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                label="Password"
                                placeholder="min 8 characters"
                                type="password"
                            />
                        </div>

                    </div>

                    {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
                    <button type="submit" className='btn-primary'>
                        SIGNUP
                    </button>

                    <p className='text-[13px] text-theme-secondary mt-3'>
                        Already have an account? {" "}
                        <Link className="font-medium text-primary underline" to="/login">
                            login
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default SignUp