document.querySelector('.auth-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const form = document.getElementById('registerForm');
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

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

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').style.display = 'block';
        isValid = false;
    }

    if (!isValid) return;

    // For frontend testing, log the data and show success message
    console.log('Form submitted with:', {
        fullName,
        email,
        password: '********' // Don't log actual password
    });

    // Mock successful registration
    alert('Registration successful! (Frontend Test)');
    
    // Uncomment to test redirect
    // window.location.href = '/workspace';
});
