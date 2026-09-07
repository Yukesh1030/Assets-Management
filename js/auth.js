// Form validations and redirections

function handleContactSubmit(event) {
    event.preventDefault();
    let isValid = true;
    
    // Simple validation logic
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const type = document.getElementById('contact-type');
    const message = document.getElementById('contact-message');
    
    [name, email, type, message].forEach(el => {
        if (!el.value.trim()) {
            el.parentElement.classList.add('has-error');
            isValid = false;
        } else {
            el.parentElement.classList.remove('has-error');
        }
    });
    
    if (isValid) {
        window.location.href = '404.html';
    }
}

function handleLoginSubmit(event) {
    event.preventDefault();
    let isValid = true;
    
    const email = document.getElementById('login-email');
    const pass = document.getElementById('login-password');
    const type = document.getElementById('login-type').value;
    
    [email, pass].forEach(el => {
        if (!el.value.trim()) {
            el.parentElement.classList.add('has-error');
            isValid = false;
        } else {
            el.parentElement.classList.remove('has-error');
        }
    });
    
    if (isValid) {
        // Extract a dynamic name from the email (e.g., john.doe@example.com -> John Doe)
        let namePart = email.value.split('@')[0];
        let dynamicName = namePart.split(/[\.\-_]/).map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ');
        localStorage.setItem('stackly_username', dynamicName);

        if (type === 'Admin') {
            window.location.href = 'AdminDashboard.html';
        } else {
            window.location.href = 'ClientDashboard.html';
        }
    }
}

function handleSignupSubmit(event) {
    event.preventDefault();
    let isValid = true;
    
    const name = document.getElementById('signup-name');
    const email = document.getElementById('signup-email');
    const pass = document.getElementById('signup-password');
    
    [name, email, pass].forEach(el => {
        if (!el.value.trim()) {
            el.parentElement.classList.add('has-error');
            isValid = false;
        } else {
            el.parentElement.classList.remove('has-error');
        }
    });
    
    if (isValid) {
        window.location.href = 'Login.html';
    }
}
