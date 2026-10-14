/**
 * Mathilda Wallenstam - Personlig Portfölj & Varumärkessida
 * Interaktiva funktioner för navigering, expanderbart innehåll och kopiering
 */

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================================================
    // 1 · Expanderbar sektion: Visa mer / Visa mindre (#visa-mer & #mer)
    // ==========================================================================
    const knapp = document.querySelector("#visa-mer");
    const mer = document.querySelector("#mer");

    if (knapp && mer) {
        // Dölj sektionen som standard
        mer.classList.add("gomd");
        knapp.setAttribute("aria-expanded", "false");

        function visaMer() {
            mer.classList.toggle("gomd");
            const arGomd = mer.classList.contains("gomd");

            if (arGomd) {
                knapp.textContent = "Visa fler detaljer & verktyg";
                knapp.setAttribute("aria-expanded", "false");
            } else {
                knapp.textContent = "Visa färre detaljer";
                knapp.setAttribute("aria-expanded", "true");
            }
        }

        knapp.addEventListener("click", visaMer);
    }

    // ==========================================================================
    // 2 · Kopiera e-postadressen med ett klick (#kopiera)
    // ==========================================================================
    const kopiera = document.querySelector("#kopiera");
    const kopieraStatus = document.querySelector("#kopiera-meddelande");
    const epost = "mathilda@wallenstams.se";

    if (kopiera) {
        async function kopieraMail() {
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(epost);
                } else {
                    // Fallback för äldre webbläsare
                    const tempInput = document.createElement("textarea");
                    tempInput.value = epost;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand("copy");
                    document.body.removeChild(tempInput);
                }

                kopiera.textContent = "Kopierat! ✓";
                if (kopieraStatus) {
                    kopieraStatus.textContent = "Kopierad till urklipp!";
                }

                setTimeout(() => {
                    kopiera.textContent = "Kopiera adress";
                    if (kopieraStatus) {
                        kopieraStatus.textContent = "";
                    }
                }, 2500);
            } catch (err) {
                console.error("Kunde inte kopiera:", err);
                kopiera.textContent = "Kunde inte kopiera";
            }
        }

        kopiera.addEventListener("click", kopieraMail);
    }

    // ==========================================================================
    // 3 · Responsiv mobilmeny
    // ==========================================================================
    const mobilMenyKnapp = document.querySelector("#mobil-meny-knapp");
    const huvudmeny = document.querySelector("#huvudmeny");
    const navLankar = document.querySelectorAll(".nav-lank");

    if (mobilMenyKnapp && huvudmeny) {
        mobilMenyKnapp.addEventListener("click", () => {
            const arOppen = huvudmeny.classList.toggle("oppen");
            mobilMenyKnapp.classList.toggle("oppen", arOppen);
            mobilMenyKnapp.setAttribute("aria-expanded", arOppen ? "true" : "false");
        });

        // Stäng mobilmenyn när en länk klickas
        navLankar.forEach(lank => {
            lank.addEventListener("click", () => {
                huvudmeny.classList.remove("oppen");
                mobilMenyKnapp.classList.remove("oppen");
                mobilMenyKnapp.setAttribute("aria-expanded", "false");
            });
        });
    }

    // ==========================================================================
    // 4 · Aktiv sektionsmarkör vid skroll
    // ==========================================================================
    const sektioner = document.querySelectorAll("section[id]");

    function uppdateraAktivLank() {
        const skrollPosition = window.scrollY + 120;

        sektioner.forEach(sektion => {
            const topp = sektion.offsetTop;
            const hojd = sektion.offsetHeight;
            const id = sektion.getAttribute("id");

            if (skrollPosition >= topp && skrollPosition < topp + hojd) {
                navLankar.forEach(lank => {
                    if (lank.getAttribute("href") === `#${id}`) {
                        lank.classList.add("aktiv");
                    } else {
                        lank.classList.remove("aktiv");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", uppdateraAktivLank, { passive: true });

    // ==========================================================================
    // 5 · Snabbmeddelande-formulär (Feedback)
    // ==========================================================================
    const kontaktFormular = document.querySelector("#kontakt-formular");
    const formularStatus = document.querySelector("#formular-status");

    if (kontaktFormular) {
        kontaktFormular.addEventListener("submit", (e) => {
            e.preventDefault();
            const namnInput = document.querySelector("#namn");
            const besokare = namnInput ? namnInput.value.trim() : "där";

            if (formularStatus) {
                formularStatus.textContent = `Tack ${besokare}! Ditt meddelande är mottaget. Jag återkommer inom kort.`;
                formularStatus.classList.add("lyckades");
            }

            kontaktFormular.reset();

            setTimeout(() => {
                if (formularStatus) {
                    formularStatus.textContent = "";
                    formularStatus.classList.remove("lyckades");
                }
            }, 5000);
        });
    }
});