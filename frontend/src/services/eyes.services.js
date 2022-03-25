import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();
const BaseUrl = `${publicRuntimeConfig.apiUrl}/eyes`;

export const eyesService = {
    classify,
};

function classify(image) {
    const formData = new FormData();
    formData.append("file",image);
    const requestOptions = {
        method: 'POST',
        body: formData
    };
    return fetch(BaseUrl + '/classify', requestOptions)
        .then(response => response.json())
        .catch(error => {return error;});
}
