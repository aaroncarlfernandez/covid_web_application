NProgress.configure({ showSpinner: false });
NProgress.set(0.0);

fetch(`http://localhost:5000/unique/observation-dates`, {method: 'GET'})
.then(response => response.json())
.then(result => {
    NProgress.set(5.0);
    document.getElementById('obsDatesChoices').innerHTML = "";

    for (let i=0; i<result.unique_observation_dates.length; i++) {
        document.getElementById('obsDatesChoices').innerHTML +=
        ` 
            <option value="${result.unique_observation_dates[i].observation_date_trunc}">${result.unique_observation_dates[i].observation_date_trunc}</option>
        `;
    }
    NProgress.set(1.0);
})
.catch(error => console.log(error))

document.getElementById('submitButton').addEventListener('click', (e) => {
    e.preventDefault();
    NProgress.set(0.0);

    let observationDate = document.getElementById('obsDatesChoices').value;
    let targetCount = document.getElementById('targetCount').value;

    fetch(`http://localhost:5000/top/confirmed?observation_date=${observationDate}&max_results=${targetCount}`, {method: 'GET'})
    .then(response => response.json())
    .then(result => {
        NProgress.set(5.0);
        document.getElementById('resultBody').innerHTML = "";

        let rank  = 0;
        let prevValue = 0;
        for (let i=0; i<result.countries.length; i++) {
            if (prevValue!=result.countries[i].confirmed) { rank++; }
            document.getElementById('resultBody').innerHTML +=
            `
                <tr>
                    <td class="table-info">${rank}</td>
                    <td class="table-primary">${result.countries[i].country}</td>
                    <td class="table-warning">${result.countries[i].confirmed}</td>
                    <td class="table-danger">${result.countries[i].deaths}</td>
                    <td class="table-success">${result.countries[i].recovered}</td>
                </tr>
            `;
            prevValue = result.countries[i].confirmed;
        }
        NProgress.set(1.0);
    })
    .catch(error => console.log(error));
});
