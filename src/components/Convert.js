import React, { useState, useEffect } from 'react';
import axios from 'axios';





const Convert = ({language, text}) => {

    const [results, setResults] = useState('');
    const [debouncedResults, setDebouncedResults] = useState(text);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedResults(text);
                }, 500);

                return () => {
                    clearTimeout(timerId);
                };
    }, [text]);

    useEffect(() => {
        const doTranslation = async () => {
          const {data} = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
                params: {
                    q: debouncedResults,
                    target: language.value,
                    key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                }
            });
            setResults(data.data.translations[0].translatedText);
        };
        
        doTranslation();
    }, [language, debouncedResults]);


    return(
        <div>{results}</div>
    );
};

export default Convert;