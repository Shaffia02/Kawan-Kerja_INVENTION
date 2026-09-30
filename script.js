const fairpayButton = document.querySelector(".fairpay-search");
const posisi = document.querySelector("#posisi");
const lokasi = document.querySelector("#lokasi");
const tipe = document.querySelector("#tipe");
const pengalaman = document.querySelector("#pengalaman");
const resultBox = document.querySelector(".fairpay-result");

const cta = document.querySelector("#btn");
const explore = document.querySelector("#explore");

const navbarNav = document.querySelector('.navbar-nav')

document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

fairpayButton.addEventListener("click", function () {
    if ( posisi.value === "" || lokasi.value === "" || tipe.value === "" || pengalaman.value === "" ) {
        alert("Lengkapi semua pilihan terlebih dahulu.");
        return;
    }

    const gajiDasar = {
        admin: {
            min: 3500000,
            max: 5000000
        },

        uiux: {
            min: 5000000,
            max: 8000000
        },

        socmed: {
            min: 3500000,
            max: 6000000
        },

        cs: {
            min: 3500000,
            max: 5000000
        }
    };

    const penyesuaianLokasi = {
        jkt: 0,
        bgr: -300000,
        bks: 200000,
        tgr: 300000
    };

    const penyesuaianTipe = {
        full: 1,
        part: 0.6,
        hybrid: 0.9,
        vol: 0
    };

    const penyesuaianPengalaman = {
        "3bln": 0,
        "6bln": 300000,
        "1thn": 800000,
        "2thn": 1500000
    };

    const dataGaji = gajiDasar[posisi.value];
    const lokasiBonus = penyesuaianLokasi[lokasi.value];
    const tipeMultiplier = penyesuaianTipe[tipe.value];
    const pengalamanBonus = penyesuaianPengalaman[pengalaman.value];

    let gajiMin;
    let gajiMax;

    if (tipe.value === "volunteer") {
        gajiMin = 0;
        gajiMax = 500000;
    } else {
        gajiMin =
            (dataGaji.min + lokasiBonus + pengalamanBonus)
            * tipeMultiplier;

        gajiMax =
            (dataGaji.max + lokasiBonus + pengalamanBonus)
            * tipeMultiplier;
    }

    function formatRupiah(angka) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(angka);
    }

    resultBox.innerHTML = `
        <h3>Kisaran Upah yang Sesuai</h3>
        <img src="/assets/fairpay.png" alt="Fair Pay">
        <div class="salary-result">
            <span>Perkiraan kisaran upah</span>
            <strong>
                ${formatRupiah(gajiMin)} - ${formatRupiah(gajiMax)}
            </strong>
        </div>
        <p>Berdasarkan posisi, lokasi, tipe pekerjaan, dan pengalaman yang kamu pilih.</p>
    `;
});

cta.addEventListener("click", function() {
    explore.scrollIntoView({
        behavior: "smooth"
    });
});