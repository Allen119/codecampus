
document.querySelector('.auth-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Reset error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });

    // Client-side validation
    let isValid = true;
    if (fullName.length < 2) {
        document.getElementById('fullNameError').style.display = 'block';
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    if (password.length < 8) {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }

    if (!isValid) return;

    // Send data to the Frappe API
    try {
        let csrf_token = window.csrf_token; 
        const response = await fetch('http://codecampus.local:8000/api/method/codecampus.api.register_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Frappe-CSRF-Token': csrf_token,
            },
            body: JSON.stringify({
                full_name: fullName,
                email: email,
                password: password,
            }),
        });

        const result = await response.json();

        if (result.status === 'success') {
            alert(result.message);
            // Redirect if needed
            // window.location.href = '/workspace';
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
