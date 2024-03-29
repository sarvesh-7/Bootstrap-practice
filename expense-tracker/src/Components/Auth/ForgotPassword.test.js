import {render,screen, act} from '@testing-library/react';
import ForgotPassword from './ForgotPassword';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import store from '../../store/index';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

describe('<ForgotPasssword>', ()=>{
    test('should sent password reset link', async()=>{
        //Arrange
        axios.post = jest.fn(()=>{
            return Promise.resolve({
                status : 200
            })
        });

        global.alert = jest.fn();

        axios.post.mockResolvedValueOnce({
            status: 200
        });

        render(<Provider store={store}><BrowserRouter><ForgotPassword/></BrowserRouter></Provider>);
        const ForgotPswdBtn = screen.getByRole('button');
        const email = screen.getByPlaceholderText('email');

        //Act
        userEvent.type(email, 'test@gmail.com');
        const res = await act(()=> userEvent.click(ForgotPswdBtn));

        //Assert
        const modal = screen.queryByText('Password reset link has been sent on the entered email');
        // expect().toHaveBeenCalledTimes(1);
        expect(modal).toBeInTheDocument();

    });

    test('Should give an error message if email is not valid', async()=>{
         //Arrange
         axios.post = jest.fn(()=>{
            return Promise.resolve({
                status : 400
            })
        });

        render(<Provider store={store}><BrowserRouter><ForgotPassword/></BrowserRouter></Provider>);
        const ForgotPswdBtn = screen.getByRole('button');
        const email = screen.getByPlaceholderText('email');

        //Act
        userEvent.type(email, 'test@gmail.com');
        const res = await act(async()=> await userEvent.click(ForgotPswdBtn));

        //Assert
        const modal = screen.queryByText('Error while processing request');
        expect(modal).toBeInTheDocument();
        screen.debug();
    })
})