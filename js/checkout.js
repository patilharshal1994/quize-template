// Checkout Page JavaScript

// Package data
const packages = {
    basic: {
        name: 'Basic Package',
        price: 9.99,
        period: 'month',
        features: [
            'Access to 50+ Quizzes',
            '5 Subjects',
            'Basic Progress Tracking',
            'Email Support'
        ]
    },
    premium: {
        name: 'Premium Package',
        price: 19.99,
        period: 'month',
        features: [
            'Access to 200+ Quizzes',
            'All Subjects',
            'Advanced Progress Tracking',
            'Detailed Analytics',
            'Priority Support'
        ]
    },
    enterprise: {
        name: 'Enterprise Package',
        price: 49.99,
        period: 'month',
        features: [
            'Unlimited Quizzes',
            'All Subjects & Chapters',
            'Custom Quiz Creation',
            'Advanced Analytics',
            '24/7 Premium Support',
            'API Access'
        ]
    }
};

// Get package from URL parameter
function getPackageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const packageId = urlParams.get('package') || 'basic';
    return packageId.toLowerCase();
}

// Format currency
function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

// Calculate tax (assuming 10% tax rate)
function calculateTax(subtotal) {
    return subtotal * 0.10;
}

// Format card number
function formatCardNumber(value) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
        return parts.join(' ');
    } else {
        return v;
    }
}

// Format expiry date
function formatExpiryDate(value) {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
        return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
}

// Display selected package
function displayPackage(packageId) {
    const selectedPackage = packages[packageId] || packages.basic;
    const packageSummary = document.getElementById('selectedPackage');
    const orderPackageName = document.getElementById('orderPackageName');
    const orderSubtotal = document.getElementById('orderSubtotal');
    const orderTax = document.getElementById('orderTax');
    const orderTotal = document.getElementById('orderTotal');
    const orderPeriod = document.getElementById('orderPeriod');

    // Display package in summary
    packageSummary.innerHTML = `
        <h5>${selectedPackage.name}</h5>
        <div class="package-price">${formatCurrency(selectedPackage.price)}/${selectedPackage.period}</div>
        <ul class="package-features">
            ${selectedPackage.features.map(feature => `<li><i class="bi bi-check-circle-fill"></i> ${feature}</li>`).join('')}
        </ul>
    `;

    // Update order summary
    orderPackageName.textContent = selectedPackage.name;
    orderPeriod.textContent = selectedPackage.period === 'month' ? 'Monthly' : 'Yearly';
    
    const subtotal = selectedPackage.price;
    const tax = calculateTax(subtotal);
    const total = subtotal + tax;

    orderSubtotal.textContent = formatCurrency(subtotal);
    orderTax.textContent = formatCurrency(tax);
    orderTotal.textContent = formatCurrency(total);
}

// Handle payment method change
function handlePaymentMethodChange() {
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const cardForm = document.getElementById('cardPaymentForm');
    const paypalInfo = document.getElementById('paypalPaymentInfo');
    const bankInfo = document.getElementById('bankPaymentInfo');

    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            const value = this.value;
            
            // Hide all payment forms
            cardForm.style.display = 'none';
            paypalInfo.style.display = 'none';
            bankInfo.style.display = 'none';

            // Show selected payment form
            if (value === 'card') {
                cardForm.style.display = 'block';
            } else if (value === 'paypal') {
                paypalInfo.style.display = 'block';
            } else if (value === 'bank') {
                bankInfo.style.display = 'block';
            }
        });
    });
}

// Validate card number (Luhn algorithm)
function validateCardNumber(cardNumber) {
    const cleaned = cardNumber.replace(/\s+/g, '');
    if (!/^\d+$/.test(cleaned)) {
        return false;
    }
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned.charAt(i));
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return sum % 10 === 0;
}

// Validate expiry date
function validateExpiryDate(expiry) {
    const match = expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!match) return false;
    
    const month = parseInt(match[1]);
    const year = parseInt(match[2]);
    
    if (month < 1 || month > 12) return false;
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    
    return true;
}

// Validate CVV
function validateCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

// Handle form submission
function handleFormSubmission() {
    const form = document.getElementById('checkoutForm');
    const completeBtn = document.getElementById('completePurchaseBtn');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get selected payment method
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        
        // Validate based on payment method
        if (paymentMethod === 'card') {
            const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
            const cardExpiry = document.getElementById('cardExpiry').value;
            const cardCVV = document.getElementById('cardCVV').value;
            const cardName = document.getElementById('cardName').value;
            
            if (!validateCardNumber(cardNumber)) {
                alert('Please enter a valid card number.');
                return;
            }
            
            if (!validateExpiryDate(cardExpiry)) {
                alert('Please enter a valid expiry date (MM/YY).');
                return;
            }
            
            if (!validateCVV(cardCVV)) {
                alert('Please enter a valid CVV.');
                return;
            }
            
            if (!cardName.trim()) {
                alert('Please enter the cardholder name.');
                return;
            }
        }
        
        // Validate billing information
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
        
        // Disable button and show loading
        completeBtn.disabled = true;
        completeBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
        
        // Simulate payment processing
        setTimeout(() => {
            // Get package info
            const packageId = getPackageFromURL();
            const selectedPackage = packages[packageId] || packages.basic;
            
            // Collect form data
            const formData = {
                package: selectedPackage.name,
                price: selectedPackage.price,
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zipCode: document.getElementById('zipCode').value,
                country: document.getElementById('country').value,
                paymentMethod: paymentMethod
            };
            
            // In a real application, you would send this data to your server
            console.log('Checkout Data:', formData);
            
            // Show success message
            alert('Payment processed successfully! Your package will be activated shortly.');
            
            // Redirect to profile or success page
            window.location.href = 'profile.html';
        }, 2000);
    });
}

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    // Get and display package
    const packageId = getPackageFromURL();
    displayPackage(packageId);
    
    // Handle payment method changes
    handlePaymentMethodChange();
    
    // Format card number input
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            e.target.value = formatCardNumber(e.target.value);
        });
    }
    
    // Format expiry date input
    const cardExpiryInput = document.getElementById('cardExpiry');
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function(e) {
            e.target.value = formatExpiryDate(e.target.value);
        });
    }
    
    // Format CVV input (numbers only)
    const cardCVVInput = document.getElementById('cardCVV');
    if (cardCVVInput) {
        cardCVVInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
    
    // Handle form submission
    handleFormSubmission();
    
    // Form validation
    const form = document.getElementById('checkoutForm');
    form.addEventListener('submit', function(e) {
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);
});

