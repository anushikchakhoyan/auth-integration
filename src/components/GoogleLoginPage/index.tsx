import axios from "axios";
import React, {useEffect, useState} from 'react';
import {googleLogout, CredentialResponse, useGoogleLogin} from '@react-oauth/google';

import Button from "../Button";

interface ProfileProps {
    picture: string,
    name: string,
    email: string,
}

const GoogleLoginPage = () => {
    const [profile, setProfile] = useState<ProfileProps | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const handleOnSuccess = async (codeResponse: CredentialResponse) => {
        // @ts-ignore
        const token = JSON.stringify(codeResponse.access_token);
        localStorage.setItem('access_token', token);
        setToken(token);
    }

    const handleOnError = () => {
        console.log("something went wrong!");
    }

    const handleGoogleLogin = useGoogleLogin({
        flow: 'implicit',
        prompt: '',
        useOneTap: true,
        onSuccess: handleOnSuccess,
        onError: handleOnError,
    } as {
        prompt: '',
        flow: 'implicit',
        useOneTap: boolean,
        onSuccess: () => Promise<any>,
        onError: () => void,
    });

    useEffect(
        () => {
            if (token) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res: any) => {
                        setProfile(res.data);
                        console.log('result', res)
                    })
                    .catch((err: string) => console.log("error", err));
            }
        },
        [token]
    );

    const logOut = () => {
        googleLogout();
        setProfile(null);
        localStorage.clear();
    };

    return (
        <>
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />

                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>

                    <Button onClick={logOut}>Log out</Button>
                </div>
            ) : (
                <Button onClick={() => handleGoogleLogin()}> Sign in with Google </Button>
            )}
        </>
    )
}

export default GoogleLoginPage;
