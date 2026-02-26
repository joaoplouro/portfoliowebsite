/*
* MAIN.JS
*/

/*
CONTACT FORM — Formspree via fetch

1. The user fills out the form and clicks "Send message"
2. JavaScript intercepts the submit (event.preventDefault) — prevents the redirect
3. We send the data to Formspree in the background using fetch()
4. If it succeeds → we show a success message on the site
5. If it fails → we show an error message

*/

const contactForm = document.querySelector('.contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function (event) {


    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('.formBtn');


    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.innerHTML = `
          <div class="formSuccess">
            <div class="formSuccessIcon">✦</div>
            <h3>Message sent!</h3>
            <p>Thanks for reaching out. I'll get back to you as soon as possible.</p>
          </div>
        `;
      } else {
        throw new Error('Server error');
      }

    } catch (error) {
      submitBtn.textContent = 'Something went wrong. Try again.';
      submitBtn.disabled = false;
      submitBtn.style.background = 'rgba(239, 68, 68, 0.8)';
    }

  });
}