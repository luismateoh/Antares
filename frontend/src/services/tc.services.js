import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();
const BaseUrl = `${publicRuntimeConfig.apiUrl}/toxic-comment`;

export const toxicCommentService = {
    classify,
};

function classify(comment) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'comment': comment}),
    };

    return fetch(
        BaseUrl + '/classify',
        requestOptions)
        .then(response => {
            return response.json();
        });
}
