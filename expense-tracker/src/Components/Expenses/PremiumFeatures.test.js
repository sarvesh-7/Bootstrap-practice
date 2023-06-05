import { render, screen,act} from '@testing-library/react';
import PremiumFeatures from './PremiumFeatures';
import {Provider} from 'react-redux';
import store from '../../store/index';
import userEvent from '@testing-library/user-event';

test('It should display "Activate Premium button"', ()=>{
    render(<Provider store={store}><PremiumFeatures/></Provider>);
    const premiumBtn = screen.getByRole('button', {name:/Activate premium/i});
    expect(premiumBtn).toBeInTheDocument();
    

});

test('It should activate premium account', async()=>{
    render(<Provider store={store}><PremiumFeatures/></Provider>);
    const premiumBtn = screen.getByRole('button', {name:/Activate premium/i});
    await userEvent.click(premiumBtn);
    const message = screen.getByText('Premium features activated! Check the features from Menubar');
    expect(message).toBeInTheDocument();
    screen.debug();
   
})

test('It should display deactivate premium button', async()=>{
    render(<Provider store={store}><PremiumFeatures/></Provider>);
    const deactivatePremium = screen.getByRole('button', {name:/deactivate premium/i});
    expect(deactivatePremium).toBeInTheDocument();
    screen.debug();
})

test('It should deactivate premium account', async()=>{
    render(<Provider store={store}><PremiumFeatures/></Provider>);
    const deactivatePremium = screen.getByRole('button', {name:/deactivate premium/i});
    await userEvent.click(deactivatePremium);
    const premiumBtn = screen.getByRole('button', {name:/Activate premium/i});
    expect(premiumBtn).toBeInTheDocument();
    screen.debug();
    
})