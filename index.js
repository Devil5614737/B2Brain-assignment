
// variables
const accountSection = document.querySelector('.accountSection');
const heroImage = document.querySelector('.heroImage');


// fetching the data
async function fetchData() {
    let input = document.getElementById('input').value;

    if (!input) {
        window.location = '/'
    }
    try {
        const res = await fetch(`https://tva.staging.b2brain.com/search/autocomplete_org_all/?q=${input&&input}`)
        const data = await res.json()
        displayData(data)


    } catch (error) {
        throw new Error(error)
    }

};



// displaying the data on the page


function displayData(data) {

    if (!data) {
        accountSection.classList.add('active')
        heroImage.classList.remove('active')
    } else if (data) {
        accountSection.classList.remove('active');
        heroImage.classList.add('active');
    }

    let container = document.querySelector('.similarAccountsGrid');

    data && data.forEach(item => {
        let divElem = document.createElement('div')
        let result = `<div class="account">
    <img src='./assets/avatar.png' alt="account" class="accountImg">
    <div class="accountInfo">
        <p >${item.company.substring(0,10) + "..."}</p>
        <a href=${item.website} target='_blank' class="link">${item.website}</a>
    </div>
    <button id='button' >Track</button>
    </div> `
        divElem.innerHTML = result
        container.append(divElem)
    })
}

displayData()