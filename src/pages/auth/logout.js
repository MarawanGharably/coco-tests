import React, { useEffect } from 'react';
import {logOut} from "../../APImethods/AuthAPI";
import {getHomePageURL, getLoginRedirectPath} from "../../utils/urlHelper";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";


export default function Logout(){
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(logOut())
            .then(() => {
                router.push(getLoginRedirectPath(getHomePageURL()));
            })
            .catch((err) => {
                alert('Server Error');
                console.log('Error', err)
            });
    },[]);

    return (<div/>);
}