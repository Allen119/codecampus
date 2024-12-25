document.querySelector('.auth-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Get form values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Log the form data to console for testing
        console.log('Login attempt with:', {
            email: email,
            password: password
        });

        // Mock successful login for frontend testing
        alert('Frontend test: Login form submitted successfully');
        console.log('Form validation passed, in a real app this would make an API call');
        
        // You can test the redirect
        // window.location.href = '/workspace';
    });
