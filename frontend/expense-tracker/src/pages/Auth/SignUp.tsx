import { useContext, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper.js'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector.js';
import axiosInstance from '../../utils/axiosIstance.js';
import type { AxiosError } from 'axios';
import { UserContext } from '../../context/UserContext.jsx';
import { API_PATH } from '../../utils/apiPaths.js';
import uploadImage from '../../utils/uploadImage.js';

const SignUp = () => {
    const [profilePic, setProfilePic] = useState<string | File | null>(null);
    const [fullName, setFullName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { updateUser } = useContext(UserContext);

    const [error, setError] = useState<null | string>(null);
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let profileImageUrl = "";

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
        try {

            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }

            const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl,
            });
            const { token, user } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                updateUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            if (axiosError.response?.data?.message) {
                setError(axiosError.response.data.message);
            } else {
                setError("Something went wrong.")
            }
        }

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