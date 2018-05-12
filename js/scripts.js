(function() {
	'use strict';

	var duration = 200;



	/**
	 * Modal Class
	 */

	var Modal = function(options) {
		var _self = this;

		this.options = options;
		this.state = {
			open: false
		};

		this.openModal = function() {
			_self.options.modal.classList.add('is-open');
			_self.state.open = true;
		};

		this.closeModal = function() {
			_self.options.modal.classList.add('is-closing');
			_self.options.modal.classList.remove('is-open');

			setTimeout(function() {
				_self.options.modal.classList.remove('is-closing');
				_self.state.open = false;
			}, duration);
		};

		Array.from(_self.options.openModal).forEach(button => {
			button.addEventListener('click', _self.openModal);
		});

		Array.from(_self.options.closeModal).forEach(button => {
			button.addEventListener('click', _self.closeModal);
		});

		document.addEventListener('keyup', function(event) {
			// Escape key maps to keycode `27`
			if (event.keyCode == 27) {
				if (_self.state.open) {
					_self.closeModal();
				}
			}
		});
	};



	/**
	 * Set up individual modals
	 */

	var regularModal = new Modal({
		modal:      document.querySelector('.js-modal'),
		openModal:  document.querySelectorAll('.js-open-modal'),
		closeModal: document.querySelectorAll('.js-close-modal')
	});

	var twofactorModal = new Modal({
		modal:      document.querySelector('.js-2fa-modal'),
		openModal:  document.querySelectorAll('.js-open-2fa-modal'),
		closeModal: document.querySelectorAll('.js-close-2fa-modal')
	});

	var formModal = new Modal({
		modal:      document.querySelector('.js-form-modal'),
		openModal:  document.querySelectorAll('.js-open-form-modal'),
		closeModal: document.querySelectorAll('.js-close-form-modal')
	});



	/**
	 * Delete confirmation
	 *
	 * Forces a user to type 'DELETE' in order to continue.
	 */

	var deleteModal = new Modal({
		modal:      document.querySelector('.js-delete-modal'),
		openModal:  document.querySelectorAll('.js-open-delete-modal'),
		closeModal: document.querySelectorAll('.js-close-delete-modal')
	});

	var deleteButton = document.querySelector('.js-delete-button');

	document.querySelector('.js-delete-input').addEventListener('keyup', function(event) {
		if (this.value === 'DELETE') {
			deleteButton.removeAttribute('disabled');
		}
		else {
			deleteButton.setAttribute('disabled', 'disabled');
		}
	});



	/**
	 * Dropdown Class
	 */

	var Dropdown = function(btn) {
		var _self = this;

		this.options = {
			trigger: btn,
			dropdown: btn.nextElementSibling
		};
		this.state = {
			open: false
		};

		this.toggleDropdown = function() {
			if (_self.state.open) {
				_self.closeDropdown();
			}
			else {
				_self.openDropdown();
			}
		};

		this.openDropdown = function() {
			_self.options.trigger.classList.add('is-open');
			_self.options.dropdown.classList.add('is-open');
			_self.state.open = true;
		};

		this.closeDropdown = function() {
			_self.options.trigger.classList.remove('is-open');
			_self.options.dropdown.classList.remove('is-open');
			_self.options.dropdown.classList.add('is-closing');

			setTimeout(function() {
				_self.options.dropdown.classList.remove('is-closing');
				_self.state.open = false;
			}, duration);
		};

		_self.options.trigger.addEventListener('click', function(event) {
			event.stopPropagation();

			_self.toggleDropdown();
		});

		document.addEventListener('keyup', function(event) {
			// Escape key maps to keycode `27`
			if (event.keyCode == 27) {
				if (_self.state.open) {
					_self.closeDropdown();
				}
			}
		});
	};

	// Enable all dropdowns
	Array.from(document.querySelectorAll('.js-dropdown')).forEach(button => {
		new Dropdown(button);
	});

}());
