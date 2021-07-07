    window.onload = function () {

        const table = document.getElementById("propertiesTable");
        let sortOrder = "asc";

        const propertyIdCol = document.getElementById("id");
        const propertyNameCol = document.getElementById("name");
        const countryCol = document.getElementById("country");
        const isActiveCol = document.getElementById("isActive");
        const hasWebsiteCol = document.getElementById("web");
        const isWebActiveCol = document.getElementById("webactv");
        const emailCol = document.getElementById("eml");
        const phoneCol = document.getElementById("phn");
        const commissionCol = document.getElementById("cmsn");

        const propertyId = document.getElementById("propertyid");
        const propertyName = document.getElementById("propertyname");
        const countryName = document.getElementById("countryname");
        const isActive = document.getElementById("isactive");
        const hasWebsite = document.getElementById("website");
        const isWebActive = document.getElementById("webactive");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const commission = document.getElementById("commission");

        function sortTable(colIdx, beingSorted, notBeingSorted) {

            for (let i = 0; i < notBeingSorted.length; i++) {
                notBeingSorted[i]?.classList.remove('fa-arrow-down', 'fa-arrow-up');
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

            let rows, switching, i, x, y, shouldSwitch;
            switching = true;

            if (colIdx === 0) {
                while (switching) {
                    switching = false;
                    rows = table.getElementsByTagName("tr");
                    for (i = 1; i < (rows.length - 1); i++) {
                        shouldSwitch = false;
                        x = rows[i].getElementsByTagName("td")[colIdx];
                        y = rows[i + 1].getElementsByTagName("td")[colIdx];

                        if (parseInt(x.innerHTML) < parseInt(y.innerHTML) && sortOrder === "desc") {
                            shouldSwitch = true;
                            break;
                        }
                        if (parseInt(x.innerHTML) > parseInt(y.innerHTML) && sortOrder === "asc") {
                            shouldSwitch = true;
                            break;
                        }
                    }
                    if (shouldSwitch) {
                        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                        switching = true;
                    }
                }
            }
            else {
                while (switching) {
                    switching = false;
                    rows = table.getElementsByTagName("tr");
                    for (i = 1; i < (rows.length - 1); i++) {
                        shouldSwitch = false;
                        x = rows[i].getElementsByTagName("td")[colIdx];
                        y = rows[i + 1].getElementsByTagName("td")[colIdx];

                        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase() && sortOrder === "desc") {
                            shouldSwitch = true;
                            break;
                        }
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase() && sortOrder === "asc") {
                            shouldSwitch = true;
                            break;
                        }
                    }
                    if (shouldSwitch) {
                        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                        switching = true;
                    }
                }
            }
        }

        if (propertyIdCol !== null) {
            propertyIdCol.onclick = function (e) {
                sortTable(0, propertyId, [propertyName, countryName, isActive, hasWebsite, isWebActive, email, phone, commission]);
            };
        }
        if (propertyNameCol !== null) {
            propertyNameCol.onclick = function (e) {
                sortTable(1, propertyName, [propertyId, countryName, isActive, hasWebsite, isWebActive, email, phone, commission]);
            };
        }
        if (countryCol !== null) {
            countryCol.onclick = function (e) {
                sortTable(2, countryName, [propertyId, propertyName, isActive, hasWebsite, isWebActive, email, phone, commission]);
            };
        }
        if (isActiveCol !== null) {
            isActiveCol.onclick = function (e) {
                sortTable(3, isActive, [propertyId, propertyName, countryName, hasWebsite, isWebActive, email, phone, commission]);
            };
        }
        if (hasWebsiteCol !== null) {
            hasWebsiteCol.onclick = function (e) {
                sortTable(4, hasWebsite, [propertyId, propertyName, countryName, isActive, isWebActive, email, phone, commission]);
            };
        }
        if (isWebActiveCol !== null) {
            isWebActiveCol.onclick = function (e) {
                sortTable(5, isWebActive, [propertyId, propertyName, countryName, isActive, hasWebsite, email, phone, commission]);
            };
        }
        if (emailCol !== null) {
            emailCol.onclick = function (e) {
                sortTable(6, email, [propertyId, propertyName, countryName, isActive, hasWebsite, isWebActive, phone, commission]);
            };
        }
        if (phoneCol !== null) {
            phoneCol.onclick = function (e) {
                sortTable(7, phone, [propertyId, propertyName, countryName, isActive, hasWebsite, isWebActive, email, commission]);
            };
        }
        if (commissionCol !== null) {
            commissionCol.onclick = function (e) {
                sortTable(8, commission, [propertyId, propertyName, countryName, isActive, hasWebsite, isWebActive, email, phone]);
            };
        }
    };
