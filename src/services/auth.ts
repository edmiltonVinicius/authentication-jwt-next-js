import { v4 as uuid } from 'uuid';

type SigninRequestData = {
    email: string;
    password: string;
};

const delay = (amount = 758) => new Promise(resolve => setTimeout(resolve, amount));

export async function signinRequest(data: SigninRequestData) {
    await delay();

    return {
        token: uuid(),
        user: {
            name: 'Edmilton Vinicius Pansanato',
            email: 'edmilton.vincius@email.com',
            avatar_url: 'https://github.com/edmiltonvinicius.png'      
        }
    };
}

export async function recoverUserInformation() {
    await delay();

    return {
        user: {
            name: 'Edmilton Vinicius Pansanato',
            email: 'edmilton.vincius@email.com',
            avatar_url: 'https://github.com/edmiltonvinicius.png'      
        }
    };
}