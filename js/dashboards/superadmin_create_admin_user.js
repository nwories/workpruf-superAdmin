// ============================================
// FORM INITIALIZATION & SETUP
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const adminForm = document.getElementById('adminForm');
    const cancelBtn = document.getElementById('cancelBtn');
    
    initializeNavigation();
    initializeFormListeners();
    setupFormValidation();
    setupButtonActions();
});

// ============================================
// NAVIGATION MENU TOGGLE
// ============================================

function initializeNavigation() {
    const navParents = document.querySelectorAll('.nav-item-parent');
    
    navParents.forEach(parent => {
        parent.addEventListener('click', function(e) {
            e.preventDefault();
            toggleSubmenu(this);
        });
    });
    
    // Close submenu when clicking a subitem
    const subItems = document.querySelectorAll('.nav-subitem');
    subItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            handleSubitemClick(this);
        });
    });
}

function toggleSubmenu(parentElement) {
    const toggleId = parentElement.getAttribute('data-toggle');
    const submenu = document.getElementById(toggleId);
    const isExpanded = parentElement.classList.contains('expanded');
    
    // Close all other submenus
    document.querySelectorAll('.nav-item-parent').forEach(item => {
        if (item !== parentElement) {
            item.classList.remove('expanded');
            const id = item.getAttribute('data-toggle');
            if (id) {
                document.getElementById(id).classList.remove('expanded');
            }
        }
    });
    
    // Toggle current submenu
    if (isExpanded) {
        parentElement.classList.remove('expanded');
        submenu.classList.remove('expanded');
    } else {
        parentElement.classList.add('expanded');
        submenu.classList.add('expanded');
    }
}

function handleSubitemClick(subitemElement) {
    // Remove active class from all subitems in this submenu
    const parent = subitemElement.parentElement;
    parent.querySelectorAll('.nav-subitem').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked subitem
    subitemElement.classList.add('active');
    
    console.log('Navigated to:', subitemElement.textContent.trim());
}

function initializeFormListeners() {
    const roleRadios = document.querySelectorAll('input[name="role"]');
    const scopeRadios = document.querySelectorAll('input[name="scope"]');
    const permissionsSelect = document.getElementById('permissions');
    const twoFaToggle = document.getElementById('twoFa');
    const sendEmailCheckbox = document.getElementById('sendEmail');
    
    // Role selection listener
    roleRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            handleRoleChange(this.value);
        });
    });
    
    // Access scope listener
    scopeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            handleScopeChange(this.value);
        });
    });
    
    // Permissions dropdown listener
    permissionsSelect.addEventListener('change', function() {
        handlePermissionsChange(this.value);
    });
    
    // 2FA toggle listener
    twoFaToggle.addEventListener('change', function() {
        handleTwoFaToggle(this.checked);
    });
    
    // Send email checkbox listener
    sendEmailCheckbox.addEventListener('change', function() {
        handleSendEmailToggle(this.checked);
    });
}

// ============================================
// EVENT HANDLERS
// ============================================

function handleRoleChange(role) {
    console.log('Role selected:', role);
    
    // Visual feedback - update active card
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => {
        const input = card.querySelector('input[type="radio"]');
        if (input.value === role) {
            card.style.borderColor = 'var(--primary-color)';
        }
    });
    
    // Update permissions based on role
    const permissionsSelect = document.getElementById('permissions');
    switch(role) {
        case 'super-admin':
            permissionsSelect.value = 'all-permissions';
            break;
        case 'platform-admin':
            permissionsSelect.value = 'user-management';
            break;
        case 'support-admin':
            permissionsSelect.value = 'support';
            break;
    }
}

function handleScopeChange(scope) {
    console.log('Scope selected:', scope);
    
    if (scope === 'specific-orgs') {
        // In a real implementation, you'd show a modal or dropdown for organization selection
        showNotification('Specific Organizations selected. Organization selection interface would appear here.', 'info');
    }
}

function handlePermissionsChange(permission) {
    console.log('Permissions changed:', permission);
    
    // Update the selected permission in the UI
    const permissionsSelect = document.getElementById('permissions');
    console.log('Current selection:', permissionsSelect.options[permissionsSelect.selectedIndex].text);
}

function handleTwoFaToggle(isChecked) {
    console.log('2FA enabled:', isChecked);
    
    if (isChecked) {
        showNotification('Two-Factor Authentication will be required for this admin account', 'success');
    }
}

function handleSendEmailToggle(isChecked) {
    console.log('Send email enabled:', isChecked);
    
    if (isChecked) {
        showNotification('Invitation email will be sent upon admin creation', 'info');
    }
}

// ============================================
// FORM VALIDATION
// ============================================

function setupFormValidation() {
    const form = document.getElementById('adminForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
}

function validateForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const adminEmail = document.getElementById('adminEmail').value.trim();
    const roleSelected = document.querySelector('input[name="role"]:checked');
    
    // Validate required fields
    if (!firstName) {
        showNotification('Please enter a first name', 'error');
        return false;
    }
    
    if (!lastName) {
        showNotification('Please enter a last name', 'error');
        return false;
    }
    
    if (!adminEmail) {
        showNotification('Please enter an email address', 'error');
        return false;
    }
    
    // Validate email format
    if (!isValidEmail(adminEmail)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    if (!roleSelected) {
        showNotification('Please select an admin role', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// FORM SUBMISSION
// ============================================

function submitForm() {
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('adminEmail').value,
        role: document.querySelector('input[name="role"]:checked').value,
        scope: document.querySelector('input[name="scope"]:checked').value,
        permissions: document.getElementById('permissions').value,
        require2FA: document.getElementById('twoFa').checked,
        sendEmail: document.getElementById('sendEmail').checked,
        createdAt: new Date().toISOString()
    };
    
    console.log('Form Data to Submit:', formData);
    
    // Simulate API call
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification(`Admin user "${formData.firstName} ${formData.lastName}" created successfully!`, 'success');
        resetForm();
    }, 1500);
}

// ============================================
// BUTTON ACTIONS
// ============================================

function setupButtonActions() {
    const cancelBtn = document.getElementById('cancelBtn');
    
    cancelBtn.addEventListener('click', function() {
        if (formHasChanges()) {
            if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
                resetForm();
            }
        } else {
            resetForm();
        }
    });
}

function resetForm() {
    const form = document.getElementById('adminForm');
    form.reset();
    
    // Reset toggle switches and checkboxes to initial state
    document.getElementById('twoFa').checked = false;
    document.getElementById('sendEmail').checked = true;
    document.getElementById('permissions').value = 'all-permissions';
    document.querySelector('input[name="scope"]').checked = true;
    
    console.log('Form reset');
}

function formHasChanges() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const adminEmail = document.getElementById('adminEmail').value.trim();
    const twoFa = document.getElementById('twoFa').checked;
    const sendEmail = document.getElementById('sendEmail').checked;
    
    return firstName !== '' || lastName !== '' || adminEmail !== '' || twoFa || sendEmail;
}

// ============================================
// UI FEEDBACK FUNCTIONS
// ============================================

function showLoadingState() {
    const submitBtn = document.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating...';
    submitBtn.style.opacity = '0.7';
    
    return () => hideLoadingState(submitBtn, originalText);
}

function hideLoadingState() {
    const submitBtn = document.querySelector('.btn-primary');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Create Admin';
    submitBtn.style.opacity = '1';
}

function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ============================================
// NOTIFICATION STYLES (Injected)
// ============================================

function injectNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            opacity: 0;
            transform: translateX(400px);
            transition: all 0.3s ease;
            max-width: 300px;
        }
        
        .notification.show {
            opacity: 1;
            transform: translateX(0);
        }
        
        .notification-success {
            background-color: #10B981;
            color: white;
        }
        
        .notification-error {
            background-color: #EF4444;
            color: white;
        }
        
        .notification-info {
            background-color: #3B82F6;
            color: white;
        }
        
        .notification-warning {
            background-color: #F59E0B;
            color: white;
        }
        
        @media (max-width: 768px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// Inject notification styles on page load
injectNotificationStyles();

// ============================================
// ACCESSIBILITY & KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', function(e) {
    // ESC key to reset form
    if (e.key === 'Escape') {
        const form = document.getElementById('adminForm');
        if (formHasChanges()) {
            if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
                resetForm();
            }
        }
    }
    
    // Enter key on form to submit (standard behavior)
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        const form = document.getElementById('adminForm');
        if (e.target.form === form) {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    }
});

// ============================================
// LOCAL STORAGE FOR DRAFT SAVING
// ============================================

function saveFormDraft() {
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('adminEmail').value,
        role: document.querySelector('input[name="role"]:checked')?.value,
        scope: document.querySelector('input[name="scope"]:checked')?.value,
        permissions: document.getElementById('permissions').value,
        require2FA: document.getElementById('twoFa').checked,
        sendEmail: document.getElementById('sendEmail').checked,
    };
    
    localStorage.setItem('adminFormDraft', JSON.stringify(formData));
    console.log('Form draft saved');
}

function loadFormDraft() {
    const draft = localStorage.getItem('adminFormDraft');
    
    if (draft) {
        const formData = JSON.parse(draft);
        
        document.getElementById('firstName').value = formData.firstName || '';
        document.getElementById('lastName').value = formData.lastName || '';
        document.getElementById('adminEmail').value = formData.email || '';
        
        if (formData.role) {
            document.querySelector(`input[name="role"][value="${formData.role}"]`).checked = true;
        }
        
        if (formData.scope) {
            document.querySelector(`input[name="scope"][value="${formData.scope}"]`).checked = true;
        }
        
        document.getElementById('permissions').value = formData.permissions || 'all-permissions';
        document.getElementById('twoFa').checked = formData.require2FA || false;
        document.getElementById('sendEmail').checked = formData.sendEmail !== false; // Default true
        
        console.log('Form draft loaded');
    }
}

// Save draft on input change (optional - uncomment to enable)
document.getElementById('adminForm').addEventListener('change', saveFormDraft);

// Load draft on page load (optional - uncomment to enable)
// window.addEventListener('load', loadFormDraft);

console.log('Admin User Creation Form initialized');


const buttons = document.querySelectorAll('.menu-item .btn');

buttons.forEach(btn => {
  btn.addEventListener('click', function() {
    // Remove active class from other buttons
    buttons.forEach(otherBtn => {
      if (otherBtn !== this) {
        otherBtn.classList.remove('active');
        otherBtn.nextElementSibling.classList.add('closed');
      }
    });
    
    // Toggle current button
    this.classList.toggle('active');
    this.nextElementSibling.classList.toggle('closed');
  });
});

