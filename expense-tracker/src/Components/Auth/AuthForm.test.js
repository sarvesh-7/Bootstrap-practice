import AuthForm from './Authform.js';
import {render, screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import store from '../../store/index';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

describe('AuthForm Component', ()=>{
    beforeEach(()=>{
        render(<Provider store={store}><BrowserRouter><AuthForm/></BrowserRouter></Provider>);
    })
    test('renders form text as "Login"', ()=>{

        //Assert
        const formText = screen.getByText('Login', {exact:false});
        expect(formText).toBeInTheDocument();
    });

    test('Should render signup button and "Have an account? Login" button', ()=>{
        //Arrange
        const button1 = screen.getByText('Have an account?Login', {exact:false});
        const button2 = screen.getByRole('button', {name : 'Sign up'}); 

        //Assert
        expect(button1).toBeInTheDocument();
        expect(button2).toBeInTheDocument();
    });

    test('Should switch from sign up button to login button when clicked on "Have an account? Login" button', ()=>{
       //Arrange
       const button1 = screen.getByText('Have an account?Login', {exact:false});

       //Action
       userEvent.click(button1);

       //Assert
       const button2 = screen.queryByRole('button', {name : 'Login'});
       expect(button2).toBeInTheDocument();
    //    screen.debug();
    });

    test('Should create a new user when clicked on signup', async()=>{
        //Arrange
        const signupBtn = screen.queryByRole('button', {name : 'Sign up'});
        const email = screen.getByPlaceholderText('Email');
        const password = screen.getByPlaceholderText('Password');
        const confPassword = screen.getByPlaceholderText('Confirm Password');

        window.fetch = jest.fn(()=>{
            return Promise.resolve({
                ok : true
            });
        });

        global.alert = jest.fn();

        //Action
        userEvent.type(email, 'test@gmail.com');
        userEvent.type(password, 'Sarvesh');
        userEvent.type(confPassword, 'Sarvesh');
        await act(()=>userEvent.click(signupBtn));

        //Assert
        expect(global.alert).toHaveBeenCalledTimes(1);

    })


})