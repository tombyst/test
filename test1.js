    window.onload = function () {

        const table = document.getElementById("propertiesTable");
        let sortOrder = "asc";

        function sortRows(colIndex, beingSorted, notBeingSorted) {

            for (let i = 0; i < notBeingSorted.length; i++) {
                notBeingSorted[i].classList.remove('fa-arrow-down', 'fa-arrow-up');
            }

            //flip sort order between ascending or descending
            if (sortOrder === "asc") {
                sortOrder = "desc";
                beingSorted.classList.add('fa-arrow-up');
                beingSorted.classList.remove('fa-arrow-down');
            }
            else {
                sortOrder = "asc";
                beingSorted.classList.add('fa-arrow-down');
                beingSorted.classList.remove('fa-arrow-up');
            }

            let switching, rows, i, x, y, shouldSwitch;
            switching = true;
            while (switching) {
                switching = false;
                rows = table.getElementsByTagName("tr");
                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("td")[colIndex];
                    y = rows[i + 1].getElementsByTagName("td")[colIndex];

                    if (isNaN(parseFloat(x.innerHTML))) {
                        let xTrimmed = x.innerHTML.trim().toLowerCase();
                        let yTrimmed = y.innerHTML.trim().toLowerCase();

                        if (xTrimmed < yTrimmed && sortOrder === "desc") {
                            shouldSwitch = true;
                            break;
                        }
                        if (xTrimmed > yTrimmed && sortOrder === "asc") {
                            shouldSwitch = true;
                            break;
                        }
                    }
                    else {
                        if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML) && sortOrder === "desc") {
                            shouldSwitch = true;
                            break;
                        }
                        if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML) && sortOrder === "asc") {
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                }
            }
        }

        let colIndex, beingSorted, notBeingSorted;
        const colHeaders = Array.from(document.getElementsByTagName("th"));
        const colArrows = Array.from(document.getElementsByTagName("i"));

        colHeaders.forEach((colHeader, i) => {
            colHeader.addEventListener('click', () => {
                colIndex = i;
                beingSorted = colArrows[i];
                notBeingSorted = colArrows.filter(c => c !== beingSorted);

                sortRows(colIndex, beingSorted, notBeingSorted);
            });
        });
    };
