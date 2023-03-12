//select function
function indexLanguage(languageValue) {
    for(let i = 0; i < languages.length; ++i) {
        if(languages[i].value === languageValue) {
            return i;
        }
    }
}

function checkNextOption(select) {
    const idLanguage = indexLanguage(select.value);
    const idNextLanguage = idLanguage < languages.length - 1 ? idLanguage + 1 : 0;
    select.selectedIndex = idNextLanguage;
}

function sameSelect(changeSelect) {
    if(languageFrom.value === languageTo.value) {
        if(changeSelect.classList.contains('language-from')) {
            checkNextOption(languageTo);
        } else {
            checkNextOption(languageFrom);
        }

        inputTable();
    }
}

function defaultOption(select) {
    languages.forEach(function(language) {
        const option = document.createElement('option');
    
        option.innerText = language.name;
        option.setAttribute('value', language.value);
    
        select.append(option);
    })

    sameSelect(select);
}

//table function

function translateMonth(month, locale) {
    const translate = month.toLocaleString(locale, { month: 'long' });
    return translate[0].toUpperCase() + translate.slice(1);
}

function inputTable() {
    const monthes = 12;

    for(let month = 0; month < monthes; ++month) {
        let tableRow;
    
        if(tableBody.querySelectorAll('tr').length !== 12) {
            tableRow = document.createElement('tr');
            tableBody.append(tableRow);
    
        } else {
            tableRow = tableTranslete.querySelectorAll(`tr`)[month];
        }
    
        const dateMonth = new Date(Date.UTC(2023, month));
        const tableRowInner = `<td>${translateMonth(dateMonth, languageFrom.value)}</td> <td>${translateMonth(dateMonth, languageTo.value)}</td>`;

        tableRow.innerHTML = tableRowInner;
    }
}

//create select

const languages  = [
    {name: 'Українська', value: 'uk-UA'},
    {name: 'English',    value: 'en-US'},
    {name: 'Español',    value: 'es-ES'}
];

const languageFrom      = document.querySelector('.language-from');
const languageTo        = document.querySelector('.language-to');
const tableTranslete    = document.querySelector('.months-translates');
const tableBody         = document.createElement('tbody');

tableTranslete.append(tableBody);

defaultOption(languageFrom);
defaultOption(languageTo);

inputTable();

languageFrom.addEventListener('change', function (e) {
    inputTable();
    sameSelect(languageFrom);
})

languageTo.addEventListener('change', function (e) {
    inputTable();
    sameSelect(languageTo);
})