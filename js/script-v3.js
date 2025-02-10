/* MAIN SLIDER */
var mainSliderBottom = new Swiper(".main-slider-bottom", {
  spaceBetween: 10,
  slidesPerView: 3,
  freeMode: true,
  watchSlidesProgress: true,
});
var mainSliderTop = new Swiper(".main-slider-top", {
  spaceBetween: 10,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  thumbs: {
    swiper: mainSliderBottom,
  },
});

/* REVIEWS SLIDER */
var reviewsSlider = new Swiper(".reviews-slider", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
});

/* ADVANTAGES SLIDER */
var advantagesSlider = new Swiper(".advantages-slider", {
  slidesPerView: 1.25,
  spaceBetween: 8,
  loop: true,
  centeredSlides: true,
});

/* RECENT REVIEWS SLIDER */
var recentReviewsSlider = new Swiper(".recent-reviews-slider", {
  slidesPerView: 1.25,
  spaceBetween: 8,
  loop: true,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/* CUSTOMER REVIEWS SLIDER */
var customerReviewsSlider = new Swiper(".customer-reviews-slider", {
  slidesPerView: 1,
  spaceBetween: 42.5,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
});





/* ZOOM BTN */
document.addEventListener("DOMContentLoaded", function () {
  function fullscreenToggle(type) {
    var sliderContainer = document.querySelector('.main-slider');
    // console.log(type)
    switch(type) {
      case 'zoom':
        sliderContainer.classList.toggle('fullscreen')
        console.log(type)
        break;
      case 'image':
        sliderContainer.classList.add('fullscreen')
        break;
      case 'swiper-slide':
        sliderContainer.classList.remove('fullscreen')
        break;
    }
  }

  let mainSliderImages = document.querySelectorAll('.main-slider-top .swiper-slide img');
  let zoomBtns = document.querySelectorAll('.main-slider-top .swiper-slide .zoom-btn');
  
  mainSliderImages.forEach(image => {
    image.addEventListener('click', (event) => {
      fullscreenToggle('image')
      event.stopPropagation;
    });
  });

  zoomBtns.forEach(zoomBtn => {
    zoomBtn.addEventListener('click', () => {
      fullscreenToggle('zoom')
    });
  });


  document.addEventListener('click', function(event) {
    if (!event.target.matches(".main-slider-top .swiper-slide img") && !event.target.matches(".main-slider-top .swiper-slide .zoom-btn")) {
      fullscreenToggle('swiper-slide')
    }
  });
});



/* VIDEO PLAYING */
let allVideos = document.querySelectorAll('.video');
if(allVideos.length > 0) {
  allVideos.forEach(el => {
    let videoHolder = el.parentElement;
    videoHolder.addEventListener('click', () => {
      el.play();
    })
  })
}



/* PACKAGE LIST LOGIC */
let addToCartLink = document.getElementById('addToCartLink'); // add to cart btn
let radioButtons = document.querySelectorAll('input[type="radio"]'); // get all radio inputs

// get all total elements
let totalOldPrice = document.querySelector('.total-old-price');
let totalNewPrice = document.querySelector('.total-actual-price');
let totalDiscount = document.querySelector('.total-discount');

// get price from input
function getPrice(element, className) {
  const priceText = element.querySelector(className).textContent;
  return parseFloat(priceText.replace('€', '').replace(',', '.'));
}

// formating price to neccessary format
function formatPrice(price) {
  return price.toFixed(2).replace('.', ',') + '  €';
}

function handleRadioButtonChange(radioButton) {
  let selectedPackage = radioButton.getAttribute('data-package');
  let actualPrice = getPrice(radioButton.parentElement, '.package-actual-price');
  let oldPrice = getPrice(radioButton.parentElement, '.package-old-price');


  totalOldPrice.textContent = formatPrice(oldPrice);
  totalNewPrice.textContent = formatPrice(actualPrice);
  totalDiscount.textContent = 'ULOŽIŤ ' + formatPrice((oldPrice - actualPrice));


  // update link for selected package
  if(Number(selectedPackage) === 3) {
    addToCartLink.href = 'https://swisspower.co/cart/45079255515402:3';
    totalOldPrice.classList.remove('hide')
    totalDiscount.classList.remove('hide')
  } else if (Number(selectedPackage) === 1) {
    addToCartLink.href = 'https://swisspower.co/cart/45079255515402:1';
    totalOldPrice.classList.add('hide')
    totalDiscount.classList.add('hide')
  } else {
    addToCartLink.href = 'https://swisspower.co/cart/45079255515402:' + selectedPackage;
    totalOldPrice.classList.remove('hide')
    totalDiscount.classList.remove('hide')
  }

  // add class for selected input and delete from another
  radioButtons.forEach(otherRadioButton => {
    otherRadioButton.parentElement.classList.toggle('selected', otherRadioButton === radioButton);
  });
}

// add event handler for each radio button
radioButtons.forEach(radioButton => {
  radioButton.addEventListener('change', () => handleRadioButtonChange(radioButton));
});



/* FIXED BUY BTN */
let packageAddBtn = document.querySelector('.package__add-btn'); // add btn
let packageFixedBtn = document.querySelector('.package-fixed-btn'); // fixed add btn

if (packageAddBtn) {
  window.addEventListener('scroll', function() {
    // get btn position
    const btnPosition = packageAddBtn.getBoundingClientRect();

    // if package__add-btn isn't visible, show package-fixed-btn , and conversely
    if (btnPosition.bottom <= 0) {
      packageFixedBtn.style.transform = 'translate(0px, 0px)';
      packageFixedBtn.style.zIndex = '4';
      packageFixedBtn.style.transition = 'transform 0.2s ease-in-out 0s';
      document.body.style.paddingBottom = `${packageFixedBtn.clientHeight}px`;
    } else {
      packageFixedBtn.style.transform = 'translate(0px, 115%)';
      packageFixedBtn.style.zIndex = '4';
      packageFixedBtn.style.transition = 'transform 0.2s ease-in-out 0s';
      document.body.style.paddingBottom = ``;
    }
  });
}



/* FAQ LIST OPENING */
let faqListItem = document.querySelectorAll('.faq__item')
let faqListTitle = document.querySelectorAll('.faq-item__title')

// delete all opened items , when click for another item
function removeActiveClassExcept(removeEl) {
  faqListItem.forEach((el) => {
    if (el !== removeEl) {
      el.classList.remove('opened');
    }
  });
}
// add/remove class opened for clicked item
faqListTitle.forEach(element => {
    let elementParent = element.parentNode
    element.addEventListener('click', () => {
        if (elementParent.classList.contains('opened')) {
            elementParent.classList.remove('opened');
        } else {
            removeActiveClassExcept(elementParent);
            elementParent.classList.add('opened');
        }
    })
});




/* SMOOTH SCROLL FOR LINKS */
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const blockID = anchor.getAttribute('href').substr(1);
    const targetElement = document.getElementById(blockID);

    if (targetElement) {
      const elementOffset = targetElement.getBoundingClientRect().top;
      const offset = window.pageYOffset + elementOffset - window.innerHeight / 3;

      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  });
}

// create timer
function startCountdown(seconds) {
    const hoursElement = document.querySelector('.timer__hours');
    const minutesElement = document.querySelector('.timer__minutes');
    const secondsElement = document.querySelector('.timer__seconds');
  
    // update count function
    function updateCountdown() {
      if (seconds > 0) {
        seconds--;
  
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
  
        hoursElement.textContent = hours < 10 ? `0${hours}` : hours;
        minutesElement.textContent = minutes < 10 ? `0${minutes}` : minutes;
        secondsElement.textContent = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  
        // save time in localStorage
        localStorage.setItem('countdownTimer', seconds);
      } else {
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        clearInterval(timer);
        // remove info about timer from localStorage
        localStorage.removeItem('countdownTimer');
      }
    }
  
    // get left time form localStorage
    const storedTime = localStorage.getItem('countdownTimer');
    if (storedTime !== null) {
      seconds = parseInt(storedTime, 10);
    }
  
    // init
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
}
  
// start timer for 12 mins 30 sec (750 seconds)
startCountdown(750);