import React from 'react';
import { useTranslation } from 'react-i18next';
import "../style/languageSelector.css"

function LanguageSelector() {
    const { i18n } = useTranslation();

    // Define the available languages and their language codes

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'es', label: 'Spanish' },
        { code: 'de', label: 'German' },
        { code: 'hi', label: 'Hindi' },
        { code: 'fr', label: 'French' },
        { code: 'it', label: 'Italian' },
        { code: 'ja', label: 'Japanese' },
        { code: 'ko', label: 'Korean' },
        { code: 'pt', label: 'Portuguese' },
        { code: 'ru', label: 'Russian' },
        // Add more languages here as needed
    ];

    // Function to change the language
    const changeLanguage = (languageCode) => {
        i18n.changeLanguage(languageCode);
    };

    return (
        <div className="center-container">
            {/* <button className="close-button" onClick={onClose}></button> */}
            <div className="button-container">
                {languages.map((language) => (
                    <button
                        key={language.code}
                        onClick={() => changeLanguage(language.code)}
                        className="language-button"
                    >
                        {language.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default LanguageSelector;
