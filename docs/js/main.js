// 1. Format rows - set attribute rowspan in each row to '1'. Adding "month" cell to each row. 
// 2. Displaying only tagged conferences.
// 3. Re-format rows - group cells by month.

const tags = document.querySelectorAll('.my-2');
const tagsParentEl = document.querySelector('.my-2').parentElement;

const tableBody = document.querySelector('tbody');
const tableContent = tableBody.innerHTML;

const monthsArr = [];


let index = 0;

const formatRows = function () {

    const trs = tableBody.querySelectorAll('tr');
    const tds = tableBody.querySelectorAll('td');
    trs.forEach((tr, i) => {
        // Selecting rows with rowspan attribute
        if (tr.childNodes[1].getAttribute('rowspan') * 1 > 1) {
            //Pushing moth names into array
            monthsArr.push(tr.childNodes[1].textContent)

            let rowSpanIndex = i;

            const attr = tr.childNodes[1].getAttribute('rowspan') * 1;

            for (let i = 0; i < attr - 1; i++) {

                trs[rowSpanIndex].nextElementSibling.classList.add(`${index}`);
                rowSpanIndex++;

            };
            index++;
        }


    });

    addRows(monthsArr);
    resetRowSpanAttribute(tds);

    createResetBtn();
    addHandlerResetBtn(tags);

}

const addRows = function (monthsArr) {
    monthsArr.forEach((_, i) => {

        let index = i;

        let t = document.getElementsByClassName(`${i}`);

        [...t].forEach(el => el.insertAdjacentHTML('afterbegin', `<td class="p-2 border font-bold">${monthsArr[index]}</td>`))

    })

}


// Setting rowspan attribute to '1'
const resetRowSpanAttribute = function (tds) {
    tds.forEach(td => {
        if (td.hasAttribute('rowspan')) {
            td.setAttribute('rowspan', '1');
        }
    })

}


// Restore original content
const restoreContent = function () {
    tableBody.innerHTML = tableContent;

}

// Create and append reset button 
const createResetBtn = function () {
    if (document.querySelector('.reset')) return


    tagsParentEl.insertAdjacentHTML('afterbegin', '<p class="my-2 active" style="color:rgb(249 115 22); font-weight:bold;"><span class="reset" style="--tw-bg-opacity: 1;border-radius: 0.5rem;padding: 0.25rem;font-size: 1rem;line-height: 2rem; background-color:rgb(249 115 22); cursor:pointer; border: solid .15rem black; color:black; ">RESET</span> - Click to reset filter</p>')
}
// Event delegation for reset button
const addHandlerResetBtn = function (tags) {
    const parentEl = tags[0].parentElement;
    parentEl.addEventListener('click', function (e) {
        if (!e.target.closest('.reset')) return
        restoreContent();
        e.target.closest('.active').remove();
    })
}

// Format rows -  group by month.
const reFormatRows = function () {

    const trs = [...tableBody.querySelectorAll('tr')]
    const arr = [];

    // Pushing each month into array arr
    trs.forEach(tr => {
        arr.push(tr.childNodes[0].textContent);

    })

    //   External storage, counting appearance of each month
    const count = {};
    // How many times each month appears in table (arr array)
    for (const element of arr) {
        if (count[element]) {
            count[element] += 1;

        } else {
            count[element] = 1;
        }
    }
    // Adding rowspan attribute for rows which month appears more than once
    const months = Object.keys(count);
    months.forEach(month => {
        if (count[month] == 1) return;

        // Remove month cells + adding rowspan attribute to group month cells
        for (let i = (arr.indexOf(month) + 1); i < (arr.indexOf(month) + count[month]); i++) {
            trs[i].childNodes[0].remove();
        }
        trs[arr.indexOf(month)].childNodes[0].setAttribute('rowspan', count[month])
    })

}


// Adding event listeners to tags below table -> main function
// 1. Restore table content - allows to filter table regardless to current filter
// 2. Format rows -> ungroup month cells
// 3. Append rows with selected tag
// 4. Re-format rows -> group month cells

tags.forEach(tag => {
    tag.style.cursor = 'pointer';
    tag.addEventListener('click', function (e) {
        if (!e.target.closest('span')) return
        restoreContent();
        formatRows();
        const btnTag = e.target.closest('span')
        const allTags = tableBody.querySelectorAll(`.${btnTag.className}`)
        tableBody.innerHTML = '';

        allTags.forEach(tag => {
            tr = tag.closest('tr');

            tableBody.innerHTML += tr.innerHTML;

        })


        reFormatRows();



    })

})