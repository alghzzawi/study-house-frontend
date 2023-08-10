'use client'
import cookieCutter from 'cookie-cutter';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { useRouter } from "next/navigation";
export const AuthContext = createContext();

export function AuthWrapper({ children }) {

    const router = useRouter();

    const [globalState, setGlobalState] = useState({
        tokens_access: null,
        tokens_refresh: null,
        login,
        logout,
        refresh,
        userId: null,
        username: null,
        email: null,
        is_employee: null,
        is_staff: null
    });

    useEffect(() => {
        setGlobalState({
            tokens_access: cookieCutter.get('tokens_access'),
            tokens_refresh: cookieCutter.get('tokens_refresh'),
            login,
            logout,
            refresh,
            userId: cookieCutter.get('userId'),
            username: cookieCutter.get('username'),
            email: cookieCutter.get('email'),
            is_employee: cookieCutter.get('is_employee'),
            is_staff: cookieCutter.get('is_staff')
        })
    }, []);






    async function login(userInfo) {
        const url = 'https://study-house-backend-production.up.railway.app/api/v1/accounts/api/token/';
        try {
            const restoken = await axios.post(url, userInfo);

            const url_user = `https://study-house-backend-production.up.railway.app/api/v1/accounts/users/${userInfo.username}`;
            const config = {
                headers: {
                    'Authorization': `Bearer ${restoken.data.access}`,
                },
            };
            await axios.get(url_user, config)
                .then(res =>{
                    setGlobalState({
                        ...globalState,
                        tokens_access: restoken.data.access,
                        tokens_refresh: restoken.data.refresh,
                        userId: res.data.id,
                        username: userInfo.username,
                        email: res.data.email,
                        is_employee: res.data.Is_employee,
                        is_staff: res.data.is_staff,
                    });
        
                    cookieCutter.set('tokens_access', restoken.data.access)
                    cookieCutter.set('tokens_refresh', restoken.data.refresh)
                    cookieCutter.set('userId', res.data.id)
                    cookieCutter.set('username', userInfo.username)
                    cookieCutter.set('email', res.data.email)
                    cookieCutter.set('is_employee', res.data.Is_employee)
                    cookieCutter.set('is_staff', res.data.is_staff)
                    Swal.fire({
                        icon: 'success',
                        title: ` you signed in successfuly as ${userInfo.username}`,
                        showConfirmButton: false,
                        timer: 3000
                    })
                    
                })

            

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `There is an error`,
                showConfirmButton: false,
                timer: 3000
            })
        }
        router.push('/');
    }

    function logout() {
        cookieCutter.set('tokens_access', '', { expires: new Date(0) });
        cookieCutter.set('tokens_refresh', '', { expires: new Date(0) });
        cookieCutter.set('userId', '', { expires: new Date(0) });
        cookieCutter.set('username', '', { expires: new Date(0) });
        cookieCutter.set('email', '', { expires: new Date(0) });
        cookieCutter.set('is_employee', '', { expires: new Date(0) });
        cookieCutter.set('is_staff', '', { expires: new Date(0) });

        setGlobalState({
            tokens_access: null,
            tokens_refresh: null,
            login,
            logout,
            refresh,
            userId: null,
            username: null,
            email: null,
            is_employee: null,
            is_staff: null
        });
        
        console.log('')
        router.push('/');
    }

    async function refresh(refresh) {
        const url = "https://study-house-backend-production.up.railway.app/api/v1/accounts/api/token/refresh/";
        if (refresh) {
            await axios.post(url, { "refresh": refresh })
                .then((res) => {
                    cookieCutter.set("tokens_access", res.data.access);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <AuthContext.Provider value={globalState}>
            {children}
        </AuthContext.Provider>
    );
}
