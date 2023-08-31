const loadPhone = async (searchText = 'a', isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) =>{
    const phoneContainer = document.getElementById('phone-container');

    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    // console.log(phones);
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl p-4`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
              <button onclick="handleShowDetails('${phone.slug}')"
              class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingInfinity(false);
}

const handleShowDetails = async (id) =>{
    // console.log("show details", id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    show_details_modal.showModal();

    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <p> <span> Storage:</span> ${phone?.mainFeatures?.storage} </p>
    `
    console.log(phone);
}

const handleSearch = (isShowAll) => {
    toggleLoadingInfinity(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingInfinity = (isLoading) =>{
    const loadingInfinity = document.getElementById('loading-infinity');
    if(isLoading){
        loadingInfinity.classList.remove('hidden');
    }
    else{
        loadingInfinity.classList.add('hidden');
    }
}

const handleShowAll = (isShowAll) =>{
    handleSearch(true);
}

loadPhone();