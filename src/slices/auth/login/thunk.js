//Include Both Helper File with needed methods
import {getFirebaseBackend} from "../../../helpers/firebase_helper";

import {loginSuccess, logoutUserSuccess, apiError, reset_login_flag} from './reducer';
import {loginService} from "../../../service/auth";
import * as authService from '../../../service/auth'
import * as constant from '../../../common/constants'
import Cookies from "js-cookie";
import {customToastMsg} from "../../../common/commonFunctions";

export const loginUser = (user, history) => async (dispatch) => {

    try {
        let response;

        let userDetails = {
            // "grant_type": "password",
            // "client_id": constant.Client_ID,
            // "client_secret": constant.Client_Secret,
            "username": user.email,
            "password": user.password
        }
        authService.loginService(userDetails).then(res => {
            console.log(res)
            Cookies.set(constant.ACCESS_TOKEN, res.access_token);
            Cookies.set(constant.REFRESH_TOKEN, res.refresh_token);
            Cookies.set(constant.Expire_time, res.expire_time);
            window.location.href = '/dashboard'
            console.log(res)
        }).catch(c => {
            console.log(c.response.data.message)
            customToastMsg(c.response.data.message,0)

        })
        var data = await response;
        let tempVariable = {
            changePasswordAt: "2023-02-13T04:32:11.228Z",
            city: "California",
            company_name: "Themesbrand",
            confirm_password: "123456789",
            country: "use",
            description: "tehran",
            designation: "Lead Designer / Developer",
            email: "admin@themesbrand.com",
            first_name: "USERNAME",
            image: "",
            job_description: "You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you're working with reputable font websites. ",
            job_title: "Developer",
            joining_date: "2023-01-01T00:00:00.000Z",
            last_name: "Salehi",
            password: "$2a$12$OdX.AB8Oiz6PEXohnREMjOtIy8h4/Ha3wPMHVcA/J373tQ0afoco2",
            passwordtoken: "60896737213987cc2f81dc08ef77fcc18c6b8d8dadc13e81b31b79b55b70d9b5",
            passwordtokenexp: "2023-10-02T07:40:46.114Z",
            phone: 93353299096,
            exp_year: ['2018-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'],
            Portfolio: [],
            role: "0",
            skills: (7) ['Photoshop', 'illustrator', 'HTML', 'CSS', 'Javascript', 'Php', 'Python'],
            website: "www.velzon.com",
            zipcode: "90011",
            status: "success",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTliZWZjOWUzZGJjNWJhOWE0NzA4NyIsImlhdCI6MTY5NzQzOTk1MywiZXhwIjoxNzA1MjE1OTUzfQ.OaG2wEHEZ0ULekfBVJbRajqXoAXM3OU0qwWXEsqyMtU",
        }
        sessionStorage.setItem("authUser", JSON.stringify(tempVariable));
        dispatch(loginSuccess(tempVariable));
        // window.location.href = '/dashboard'

        // if (data) {
        //   sessionStorage.setItem("authUser", JSON.stringify(data));
        //   if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
        //     var finallogin = JSON.stringify(data);
        //     finallogin = JSON.parse(finallogin)
        //     data = finallogin.data;
        //     if (finallogin.status === "success") {
        //       console.log(data)
        //       dispatch(loginSuccess(data));
        //       history('/dashboard')
        //     } else {
        //       dispatch(apiError(finallogin));
        //     }
        //   }else{
        //     dispatch(loginSuccess(data));
        //     history('/dashboard')
        //   }
        // }

    } catch (error) {
        console.log(error)
        dispatch(apiError(error));
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        Cookies.remove(constant.ACCESS_TOKEN );
        Cookies.remove(constant.REFRESH_TOKEN );
        Cookies.remove(constant.Expire_time );
            dispatch(logoutUserSuccess(true));


    } catch (error) {
        dispatch(apiError(error));
    }
};

export const socialLogin = (type, history) => async (dispatch) => {
    try {
        let response;

        if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            const fireBaseBackend = getFirebaseBackend();
            response = fireBaseBackend.socialLoginUser(type);
        }
        //  else {
        //   response = postSocialLogin(data);
        // }

        const socialdata = await response;
        if (socialdata) {
            sessionStorage.setItem("authUser", JSON.stringify(response));
            dispatch(loginSuccess(response));
            history('/dashboard')
        }

    } catch (error) {
        dispatch(apiError(error));
    }
};


export const resetLoginFlag = () => async (dispatch) => {
    try {
        const response = dispatch(reset_login_flag());
        return response;
    } catch (error) {
        dispatch(apiError(error));
    }
};