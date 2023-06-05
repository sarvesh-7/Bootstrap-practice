import {screen,render,act} from '@testing-library/react';
import ExpenseForm from './ExpenseForm';
import {setupServer} from 'msw/node';
import {rest} from 'msw';
import {createServer} from '../test/server';
import {BrowserRouter} from 'react-router-dom';
import store from '../../store/index';
import {Provider} from 'react-redux';
import user from '@testing-library/user-event';

createServer([
    {
        path : 'https://expense-tracker-d3062-default-rtdb.firebaseio.com/.json',
        method : 'post',
        res : (req,res,ctx) =>{
            return ctx.status(200);
        }
    }
]);

test('It should add expense into database when clicked on submit button',async ()=>{
    render(<Provider store={store}><BrowserRouter><ExpenseForm/></BrowserRouter></Provider>);
    const submit = screen.getByRole('button', {name : /add expense/i});
    const amount = screen.getByRole('spinbutton', {name: 'amount'});
    const desc = screen.getByRole('textbox', {name:'desc'});
    const cat = screen.getByRole('combobox', {name:'category'});

    await user.type(amount, '100');
    await user.type(desc, 'something');
    await user.selectOptions(cat, 'Bills');
    // await user.click(submit);
    await act(async()=>await user.click(submit));

    //show alert message on screen
    const message = screen.getByText('Expense stored in database successfully');
    expect(message).toBeInTheDocument();

})

test('It should give error message if any input is blank', async()=>{
    render(<Provider store={store}><BrowserRouter><ExpenseForm/></BrowserRouter></Provider>);
    const submit = screen.getByRole('button', {name : /add expense/i});
    const amount = screen.getByRole('spinbutton', {name: 'amount'});
    const desc = screen.getByRole('textbox', {name:'desc'});
    const cat = screen.getByRole('combobox', {name:'category'});

    await user.type(amount, ' ');
    await user.type(desc, 'xzv');
    await user.selectOptions(cat, 'Bills');
    // await user.click(submit);
    await act(async()=>await user.click(submit));

    //show alert message on screen
    const message = screen.getByText('All fields are mandatory');
    expect(message).toBeInTheDocument();
})

