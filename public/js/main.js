$(document).ready(function () {

    /* =========================
       HERO CAROUSEL
    ========================= */

    let slides = $('.slide');
    let currentIndex = 0;
    let duration = 5000;

    if (slides.length > 0) {

        function nextSlide() {
            slides.eq(currentIndex).removeClass('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides.eq(currentIndex).addClass('active');
            startProgress();
        }

        function startProgress() {
            $('.progress-bar').html('<div class="bar-fill"></div>');

            $('.bar-fill').css({
                height: '100%',
                width: '0%',
                background: 'white',
                transition: `width ${duration}ms linear`
            });

            setTimeout(() => {
                $('.bar-fill').css('width', '100%');
            }, 50);
        }

        startProgress();
        setInterval(nextSlide, duration);
    }

    /* =========================
       SWIPER
    ========================= */

    if ($('.product-swiper').length > 0) {

        const swiper = new Swiper('.product-swiper', {
            loop: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            speed: 600,
            touchStartPreventDefault: false
        });

        $(document).on('click', '.product-swiper', function (e) {

            const windowWidth = $(window).width();

            if (e.clientX > windowWidth / 2) {
                swiper.slideNext();
            } else {
                swiper.slidePrev();
            }
        });
    }

    /* =========================
       CART DRAWER
    ========================= */

    const cartBtn = document.getElementById("cart-btn");
    const cartDrawer = document.getElementById("cart-drawer");
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCart = document.getElementById("close-cart");

    function openDrawer() {

        if (cartDrawer) {
            cartDrawer.classList.add("active");
        }

        if (cartOverlay) {
            cartOverlay.classList.add("active");
        }
    }

    function closeDrawer() {

        if (cartDrawer) {
            cartDrawer.classList.remove("active");
        }

        if (cartOverlay) {
            cartOverlay.classList.remove("active");
        }
    }

    if (cartBtn) {

        cartBtn.addEventListener("click", async () => {

            await loadCartItems();
            openDrawer();

        });
    }

    if (closeCart) {
        closeCart.addEventListener("click", closeDrawer);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener("click", closeDrawer);
    }

    /* =========================
       SIZE SELECTION
    ========================= */

    let selectedSize = null;

    const sizeBoxes = document.querySelectorAll(".size-box");

    sizeBoxes.forEach(box => {

        box.addEventListener("click", () => {

            sizeBoxes.forEach(btn => {
                btn.classList.remove("active-size");
            });

            box.classList.add("active-size");

            selectedSize = box.innerText.trim();

            console.log("Selected Size:", selectedSize);
        });
    });

    /* =========================
       ADD TO CART
    ========================= */

    const addToCartBtn =
        document.querySelector(".add-to-cart-btn");

    if (addToCartBtn) {

        addToCartBtn.addEventListener("click", async () => {

            const productId =
                addToCartBtn.dataset.id;

            console.log("ADD TO CART CLICKED");
            console.log(productId);
            console.log(selectedSize);

            if (!selectedSize) {

                alert("Please select a size");
                return;
            }

            try {

                const response = await fetch("/add-to-cart", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        productId: Number(productId),
                        size: selectedSize

                    })

                });

                const data = await response.json();

                console.log(data);

                if (data.notLoggedIn) {

                    window.location.href = "/login";
                    return;
                }

                if (data.success) {

                    alert("Added To Cart Successfully");

                    await loadCartItems();

                    openDrawer();
                }

            } catch (err) {

                console.log("ADD TO CART ERROR:", err);

            }

        });

    }

    /* =========================
       LOAD CART ITEMS
    ========================= */

    async function loadCartItems() {

        const cartItemsList =
            document.getElementById("cart-items-list");

        if (!cartItemsList) return;

        const response =
            await fetch("/cart-items");

        const data =
            await response.json();

        if (data.notLoggedIn) {

            cartItemsList.innerHTML = `
                <div class="empty-cart">
                    <h3>Please Login</h3>
                    <a href="/login">LOGIN</a>
                </div>
            `;

            return;
        }

        if (data.length === 0) {

            cartItemsList.innerHTML = `
                <div class="empty-cart">
                    <h3>Your cart is empty</h3>
                </div>
            `;

            return;
        }

        let html = "";

        let subtotal = 0;

        data.forEach(item => {

            subtotal += Number(item.price) * Number(item.quantity);

            html += `

            <div class="cart-item">

                <img src="${item.img_url}">

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>Size: ${item.size}</p>

                    <p>₹${item.price}</p>

                    <p>Qty: ${item.quantity}</p>

                </div>

                <button 
                    class="remove-cart-item"
                    data-id="${item.id}"
                >
                    -
                </button>

            </div>

        `;

        });

        cartItemsList.innerHTML = html;

        /* UPDATE SUBTOTAL */
        document.querySelector(".subtotal-row span:last-child")
        .innerText = `₹${subtotal}`;

        document
.querySelectorAll(".remove-cart-item")
.forEach(button => {

    button.addEventListener("click", async () => {

        const cartId = button.dataset.id;

        try{

            const response =
                await fetch(`/remove-cart/${cartId}`, {

                    method: "DELETE"

                });

            const data =
                await response.json();

            if(data.success){

                await loadCartItems();

            }

        }catch(err){

            console.log(err);

        }

    });

});
    }

    /* =========================
       PROFILE POPUP
    ========================= */

    const profileBtn =
        document.getElementById("profile-btn");

    const profilePopup =
        document.getElementById("profile-popup");

    if (profileBtn && profilePopup) {

        profileBtn.addEventListener("click", () => {

            profilePopup.classList.toggle("active");

        });

        document.addEventListener("click", (e) => {

            if (
                !profileBtn.contains(e.target) &&
                !profilePopup.contains(e.target)
            ) {

                profilePopup.classList.remove("active");

            }

        });
    }

});