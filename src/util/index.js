const { REACT_APP_API_URL = 'https://fitnesstrac-kr.herokuapp.com/api' } = process.env

export const callApi = async({url, method, token, body}) => {
    try{ 
        const options = { 
            method: method ? method.toUpperCase() : 'GET',
            headers: { 
                'Content-type': 'application/json',
            },
            body: JSON.stringify(body)
        };
        if (token) options.headers['Authorixation'] = `Bearer ${token}`;


        const response = await fetch (`${REACT_APP_API_URL}${url}`, options);
        const data = await response.json();
        if(data.error) { 
            throw (data.error)
        } 
        return (data);
    } catch (error) { 
        console.error(error);
    }
}